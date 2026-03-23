'use strict';

import * as geometry from './createGeometry.js'
import * as html from './createHTML.js'
import * as kml from './createKml.js'
import * as czml from './createCzml.js'

export async function pgCreatePoint(pool, schema, table, filterField, type, image) {

  const client = await pool.connect();
  let rows;

  try {
    const escapedSchema = client.escapeIdentifier(schema);
    const escapedTable = client.escapeIdentifier(table);
    const fullTableName = `${escapedSchema}.${escapedTable}`;

    const escapedFilter = filterField ? client.escapeIdentifier(filterField) : null;

    const sql = `
      SELECT * FROM ${fullTableName}
      ${(escapedFilter && type) ? `WHERE ${escapedFilter} = $1` : ''}`;

    const result = (escapedFilter && type) 
      ? await client.query(sql, [type]) 
      : await client.query(sql);

    rows = result.rows;
  } catch (error) {
    console.error("Database Error in pgCreatePoint:", error);
    throw error;
  } finally {
    client.release();
  }

  let iconFolderBase, defaultIconName, scale;

  if (image) {
    iconFolderBase = "icons";
    defaultIconName = image;
    scale = 0.2
  } else if (schema === "leylines") {
    iconFolderBase = "poi";
    defaultIconName = type;
    scale = 0.04
  } else if (schema === "ramar") {
    iconFolderBase = `${schema}`;
    defaultIconName = type;
    scale = 0.5
  } else {
    iconFolderBase = `${schema}`;
    defaultIconName = type;
    scale = 0.7
  }

  const newPackets = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (schema === "leylines" || schema === "ramar") {
      row.name = row.site
    }
    const featureDescription = html.createFeatureInfo(row, schema, "internal");
    const activeIconName = String(row.icon || defaultIconName || "default").toLowerCase();
    const finalIcon = `/images/${iconFolderBase}/${activeIconName}.png`;
    czml.createPoint(newPackets, row, featureDescription, scale, finalIcon, [1000, 1000]);
  }

  return newPackets;

}

export async function pgFindPOI(pool, points, lines, distance, color) {
  const wktLines = lines.map(line => {
    const p1 = points[line[0]];
    const p2 = points[line[1]];
    return `(${p1[1]} ${p1[2]} 0, ${p2[1]} ${p2[2]} 0)`;
  }).join(",");

  const client = await pool.connect();
  const newPackets = [];

  try {

    const selectPoints = `
      SELECT id, site, description, importance, x_coord, y_coord, z_coord
      FROM leylines.poi
      WHERE ST_DWithin(
        geom::geography, 
        ST_GeomFromText($1, 4326)::geography, 
        $2,
        false -- Der "use_spheroid" Parameter auf false spart Rechenzeit und verhindert oft Artefakte
      )
    `;

    const { rows } = await client.query(selectPoints, [`MULTILINESTRINGZ(${wktLines})`, distance]);

    // 3. Icons und Pakete (Synchron!)
    const iconColor = `${color[0]}-${color[1]}-${color[2]}`;
    
    for (const row of rows) {
      // Wir bereiten das Objekt für createFeatureInfo vor
      row.name = row.site; 
      const featureDescription = html.createFeatureInfo(row, "poi", "internal");
      
      const icon = `/images/icons/star_${iconColor}.svg`;
      const finalScale = row.importance * 0.03;

      // Wir pushen direkt in unser neues Array
      czml.createPoint(newPackets, row, featureDescription, finalScale, icon);
    }
  } catch (error) {
    console.error("Error in pgFindPOI:", error);
  } finally {
    client.release();
  }

  return newPackets;
}

export async function pgFindGisPOI(pool, group, distance, color, type = '%') {
  const client = await pool.connect();
  const newPackets = [];

  // SQL-Logik für den Typ-Filter (wie in pgGetMultiline)
  const typeCondition = type === '%' 
    ? `AND (g."type" LIKE $3 OR g."type" IS NULL)` 
    : `AND g."type" = $3`;

  const selectPoints = `
    SELECT DISTINCT l.id, l.site, l.description, l.importance, l.x_coord, l.y_coord, l.z_coord
    FROM leylines.poi l
    INNER JOIN leylines.lines g ON g."group" = $1 ${typeCondition}
    WHERE ST_DWithin(l.geom::geography, g.geom::geography, $2)
  `;

  try {
    const { rows } = await client.query(selectPoints, [group, distance, type]);
    
    // Icon-Pfad einmalig vorbereiten
    const iconColor = `${color[0]}-${color[1]}-${color[2]}`;
    const icon = `/images/icons/star_${iconColor}.svg`;

    for (const row of rows) {
      row.name = row.site; // Konsistenz für createFeatureInfo
      const featureDescription = html.createFeatureInfo(row, "poi", "internal");
      const finalScale = row.importance * 0.03;

      // Wir nutzen die neue synchrone czml.createPoint
      czml.createPoint(
        newPackets, 
        row, 
        featureDescription, 
        finalScale, 
        icon
      );
    }
  } catch (error) {
    console.error('Error in pgFindGisPOI:', error.message);
  } finally {
    client.release();
  }

  return newPackets;
}

export async function pgGetDelaunay(pool, maintable, linewidth, color, group) {

  const client = await pool.connect();
  const escapedTable = client.escapeIdentifier(maintable);
  const sql = `
    WITH edges AS (
      SELECT (ST_Dump(ST_DelaunayTriangles(ST_Collect(geom::geometry), 0.0, 1))).geom AS geom 
      FROM ${escapedTable}
      ${group ? 'WHERE "group" = $1' : ''}
    ) 
    SELECT ST_AsGeoJson(geom) as geom FROM edges`;

  let rows;
  
  try {
    const result = group ? await client.query(sql, [group]) : await client.query(sql);
    rows = result.rows;
  } catch (error) {
    console.error("Database Error in pgGetDelaunay:", error);
    throw error;
  } finally {
    client.release();
  }

  const newPackets = [];

  for (let id = 0; id < rows.length; id++) {
    const coords = JSON.parse(rows[id].geom).coordinates;
    const polyline = coords.flatMap(coord => [coord[0], coord[1], 0.0]);
    const featureDescription = html.createFeatureInfo({ name: id, description: id }, "line", "internal");

    geometry.createGisCorridor(newPackets, id, polyline, id, featureDescription, linewidth, color);
  }

  return newPackets;

}

export async function pgGetVoronoi(pool, maintable, linewidth, color, group) {

  const client = await pool.connect();
  const escapedTable = client.escapeIdentifier(maintable);
  const sql = `
    WITH edges AS (
      SELECT (ST_Dump(ST_VoronoiLines(ST_Collect(geom::geometry), 0.0))).geom AS geom 
      FROM ${escapedTable}
      ${group ? 'WHERE "group" = $1' : ''}
    ) 
    SELECT ST_AsGeoJson(geom) as geom FROM edges`;

  let rows;
  
  try {
    const result = group ? await client.query(sql, [group]) : await client.query(sql);
    rows = result.rows;
  } catch (error) {
    console.error("Database Error in pgGetVoronoi:", error);
    throw error;
  } finally {
    client.release();
  }

  const newPackets = [];

  for (let id = 0; id < rows.length; id++) {
    const coords = JSON.parse(rows[id].geom).coordinates;
    const polyline = coords.flatMap(coord => [coord[0], coord[1], 0.0]);
    const featureDescription = html.createFeatureInfo({ name: id, description: id }, "line", "internal");

    geometry.createGisCorridor(newPackets, id, polyline, id, featureDescription, linewidth, color);
  }

  return newPackets;

}

export async function pgGetMultiline(pool, maintable, group, linewidth, color, type = '%') {
  const client = await pool.connect();
  const newPackets = [];

  const typeCondition = type === '%' 
    ? `AND ("type" LIKE $2 OR "type" IS NULL)` 
    : `AND "type" = $2`;

  const select = `SELECT ST_AsText(geom) AS wkt_geom, id, name, description FROM ${maintable} WHERE "group" = $1 ${typeCondition}`;

  try {
    const { rows } = await client.query(select, [group, type]);

    for (const row of rows) {
      // 1. Wir säubern den String: Alles außer Zahlen, Punkten, Kommas und Leerzeichen weg
      // Das entfernt das "LINESTRING Z", "MULTILINESTRING", etc.
      const cleanWkt = row.wkt_geom.replace(/[a-zA-Z]/g, '').trim();
      
      // 2. Wir splitten nach den Segmenten (Klammern)
      const segments = row.wkt_geom.match(/\(([^()]+)\)/g);
      if (!segments) continue;

      segments.forEach((seg, index) => {
        // 3. Wir splitten die Punkte innerhalb eines Segments am Komma
        // Ein Punkt sieht so aus: "34.97 32.82 0"
        const points = seg.replace(/[()]/g, '').split(',');
        const polyline = [];

        points.forEach(p => {
          const coords = p.trim().split(/\s+/); // Splittet bei Leerzeichen
          if (coords.length >= 2) {
            polyline.push(Number(coords[0])); // Lon
            polyline.push(Number(coords[1])); // Lat
            // Wenn ein Z-Wert da ist (wie bei dir), nimm ihn, sonst 0
            polyline.push(coords[2] ? Number(coords[2]) : 0.0);
          }
        });

        const featureDescription = html.createFeatureInfo(row, "line", "internal");
        const segmentId = `${row.id}_${index}`;

        geometry.createGisCorridor(
          newPackets, 
          segmentId, 
          polyline, 
          row.name, 
          featureDescription, 
          linewidth, 
          color
        );
      });
    }
  } finally {
    client.release();
  }
  return newPackets;
}

export async function pgExportMultiline(kmlfile, pool, maintable, group, linewidth, color, type) {

  if (!type) type = '%';
  const select = `
    SELECT ST_AsGeoJSON(geom) AS geom, id, name, description, type
    FROM ${maintable} WHERE "group" = $1` +
    (type == '%' ? ` AND ("type" LIKE $2 OR "type" IS NULL)` : ` AND "type" = $2`)

  const client = await pool.connect();
  try {
    const { rows } = await client.query(select, [group, type]);
    for (const { geom, id, name, description } of rows) {
      const polylines = JSON.parse(geom);
      const polyline = polylines.coordinates.flatMap(coord => [[coord[0], coord[1]]]);
      const featureDescription = html.createFeatureInfo({ id, name, description }, "line", "internal");
      kmlfile = await kml.getLine(kmlfile, id, polyline, name, featureDescription, group);
    }
  } finally {
    client.release()
    return kmlfile;
  }
};

export async function pgExportPoint(pool, sql, param, type) {
  const client = await pool.connect();
  let pointsString = "";

  try {
    const { rows } = await client.query(sql, param);
    
    for (const row of rows) {
      // Wir rufen die neue synchrone Funktion auf
      // Beachte: Wir hängen den String einfach mit += an.
      pointsString += kml.createPoint(
        row.name, 
        row.description, 
        row.x_coord, 
        row.y_coord, 
        row.z_coord, 
        type
      );
    }
  } catch (error) {
    console.error('Error in pgExportPoint:', error.message);
    throw error;
  } finally {
    client.release();
  }
  
  return pointsString;
}

export async function pgCreateRelated(czmlfile, pool, select, dir) {

  const client = await pool.connect();
  try {
    const { rows } = await client.query(select);
    for (const row of rows) {
      var description = html.createFeatureInfo(row, "site", "internal");
      var icon  = row.image;
      czmlfile = czml.createPoint(row.id, row.website, description, icon, row.scale, Number(row.x_coord), Number(row.y_coord), Number(row.z_coord), czmlfile);
    }
  } finally {
    client.release()
    return(czmlfile);
  }

};

export async function pgCreateLine(czmlfile, maintable, group, linewidth, color) {

  var select = "SELECT ST_AsGeoJSON(geom), name, description FROM " + maintable + " WHERE \"group\" = '" + group + "';";

  const client = await pool.connect();
  try {
    const { rows } = await client.query(select);
    for (const row of rows) {
      var multilines = JSON.parse(row.st_asgeojson);
      var multiline = [];
      for (var j=0, subtot=multilines.coordinates.length; j<subtot; j++) {
        multiline.push(multilines.coordinates[j][0]);
        multiline.push(multilines.coordinates[j][1]);
        multiline.push(0.0);
      }
      if (row.description  == "Straight") {
        color = [255,0,0,128];
        linewidth = 6000;
      } else if (row.description  == "Follow") {
        color = [255,255,0,128];
        linewidth = 6000;
      } else if (row.description  == "Circle") {
        color = [255,165,0,128];
        linewidth = 12000;
      }
      czmlfile = czml.createCorridor(id, row.name, row.description, linewidth, color, multiline, czmlfile);
    }
  } finally {
    client.release()
    return(czmlfile);
  }

};

export async function pgCreateArrow(pool, maintable, group, linewidth, color) {
  const client = await pool.connect();
  const newPackets = [];

  // SQL: Wir nutzen wieder ST_AsText für den Speed-Boost
  const select = `SELECT ST_AsText(geom) AS wkt_geom, name, description FROM ${maintable} WHERE "group" = $1`;

  try {
    const { rows } = await client.query(select, [group]);

    for (const row of rows) {
      // Alle Zahlen extrahieren
      const coords = row.wkt_geom.match(/-?\d+\.?\d*/g);
      if (!coords) continue;

      // Flaches Array bauen: [lon, lat, 0, lon, lat, 0...]
      const positions = [];
      for (let i = 0; i < coords.length; i += 2) {
        positions.push(Number(coords[i]), Number(coords[i+1]), 0.0);
      }

      const description = html.createFeatureInfo(row, "arrow", "internal");
      const id = `${row.name}_arrow_${Math.random().toString(36).substr(2, 5)}`;

      // Aufruf der neuen synchronen CZML-Funktion
      czml.createArrowCarto(id, row.name, description, linewidth, color, positions, newPackets);
    }
  } finally {
    client.release();
  }
  return newPackets;
}

export async function pgCreateArea(czmlfile, pool, maintable, name, color, extrudeheight) {

  var select = "SELECT ST_AsGeoJSON(geom), name, description FROM " + maintable + " WHERE name = '" + name + "';";

  const client = await pool.connect();
  try {
    const { rows } = await client.query(select);
    for (const row of rows) {
      var polygons = JSON.parse(row.st_asgeojson);
      for (var id=0, tot1=polygons.coordinates.length; id<tot1; id++) {
        var polygon = [];
        for (var j=0, tot2=polygons.coordinates[id][0].length; j<tot2; j++) {
          polygon.push(polygons.coordinates[id][0][j][0]);
          polygon.push(polygons.coordinates[id][0][j][1]);
          polygon.push(0.0);
        }
        czmlfile = czml.createPolygon(id, row.name, row.description, color, extrudeheight, polygon, czmlfile);
      }
    }
  } finally {
      client.release()
      return(czmlfile);
  }

};

