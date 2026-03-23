'use strict';

import * as czml from './createCzml.js';
import * as geometry from './createGeometry.js';
import * as postgis from './postGIS.js';
import * as leylinesSolids from 'leylines-solids';
import * as kml from './createKml.js';

function getResult (err, res, result) {
  if (err) {
    console.log(err);
    res.status(500).send('Something failed!');
  } else {
    return res.json(result);
  }
};

// new
export async function createPointLayer(req, res, pool) {
  // Struktur: /api/layer/:schema/:table/:filterField/:type?/:image?
  const { schema, table, filterField, type, image } = req.params;

  try {
    const header = czml.createHeader();
    const packets = await postgis.pgCreatePoint(
      pool, schema, table, filterField, type, image
    );

    return res.json([...header, ...packets]);
  } catch (error) {
    console.error(`Error in createPointLayer [${schema}.${table}]:`, error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// new
export async function createGrid(req, res, pool) {
  // 1. Import der Solids (sollte am besten oben im File einmalig stehen)
  const { latitude, longitude, bearing, form, category, solid, type, pois } = req.params;

  // 2. Daten holen ohne teures Deep Copy
  const solidData = leylinesSolids[category]?.[solid];
  if (!solidData) return res.status(404).send('Solid not found');

  // 3. Mathematik (Synchron!)
  const points = leylinesSolids.getPoints(
    parseFloat(latitude), 
    parseFloat(longitude), 
    parseFloat(bearing), 
    form, 
    solidData.points
  );

  // 4. Header erstellen
  let packets = czml.createHeader();

  // 5. Logik-Zweig (Becker-Hagens Spezialisierung)
  if (category === "beckerhagens" && solidData.points.length >= 62) {
    const yinPoints = [], yangPoints = [], balancedPoints = [];
    const greenIdx = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 50, 52, 54, 56, 58];
    const blueIdx = [11, 13, 15, 17, 19, 40, 42, 44, 46, 48, 60, 61];
    
    points.forEach((pt, i) => {
      if (greenIdx.includes(i)) balancedPoints.push(pt);
      else if (blueIdx.includes(i)) yinPoints.push(pt);
      else yangPoints.push(pt); // Rest ist Orange/Yang
    });

    // Farben (ohne Mapping-Funktion, direkt definiert)
    const colorYin = [0, 255, 255, 255];
    const colorYang = [255, 165, 0, 255];
    const colorBalance = [115, 205, 50, 255];

    if (type === "points") {
      packets.push(...geometry.createPoints(yinPoints, colorYin));
      packets.push(...geometry.createPoints(yangPoints, colorYang));
      packets.push(...geometry.createPoints(balancedPoints, colorBalance));
    } else {
      // Standard: Linien (Corridors)
      packets.push(...geometry.createCorridor(points, solidData.lines, solidData.distance, solidData.color));
    }
  } else {
    // Standard-Logik für alle anderen Solids
    if (type === "points") {
      packets.push(...geometry.createPoints(points, [0, 255, 255, 255]));
    } else {
      packets.push(...geometry.createCorridor(points, solidData.lines, solidData.distance, solidData.color));
    }
  }

  // 6. Datenbank-Suche (Der einzige asynchrone Teil)
  try {
    if (pois !== "off") {
      const poiPackets = await postgis.pgFindPOI(pool, points, solidData.lines, solidData.distance, solidData.color);
      packets.push(...poiPackets);
    }
    
    return res.json(packets);
  } catch (error) {
    console.error("Grid Error:", error);
    return res.status(500).send('Internal Server Error');
  }
}

export async function createCircle(req, res, pool) {

  var lat1 = req.params.lat1;
  var lon1 = req.params.lon1;
  var lat2 = req.params.lat2;
  var lon2 = req.params.lon2;
  var type = req.params.type;

  var czmlfile = [];
  var czmlfile = czml.createHeader(czmlfile);

  if (type == "spherical") {
    var LatLon = require('geodesy').LatLonSpherical;

    var referencesvalues = [Number(lon1), Number(lat1), 0];

    var p1 = new LatLon(lat1, lon1);
    var p2 = new LatLon(lat2, lon2);
    var bearing = p1.bearingTo(p2).toFixed(20);

    for (var i=1, tot=7; i<=tot; i++) {
      var distance = i * 5000000;
      var destpoints = p2.destinationPoint(distance, bearing);

      var name = i;
      referencesvalues.push(Number(destpoints['lon']));
      referencesvalues.push(Number(destpoints['lat']));
      referencesvalues.push(Number(0));

      var color = [119, 17, 85, 64];
      var linewidth = 20000;
      //czmlfile = czml.createCorridor(name + "c", name, name, linewidth, color, referencesvalues, czmlfile);
      czmlfile = czml.createPolyline(name + "p", name, name, 3, color, referencesvalues, czmlfile);
    }

    referencesvalues.push(Number(lon1));
    referencesvalues.push(Number(lat1));
    referencesvalues.push(Number(0));

  } else {

    var LatLon = require('geodesy').LatLonEllipsoidal;

    var referencesvalues = [Number(lon1), Number(lat1), 0];

    var p1 = new LatLon(lat1, lon1);
    var p2 = new LatLon(lat2, lon2);
    var bearing = p1.initialBearingTo(p2).toFixed(20);

    for (var i=1, tot=80; i<=tot; i++) {
      var distance = i * 2000000;
      var destpoints = p1.destinationPoint(distance, bearing);

      referencesvalues.push(Number(destpoints['lon']));
      referencesvalues.push(Number(destpoints['lat']));
      referencesvalues.push(Number(0));

    }

    var color = [119, 17, 85, 255];
    var linewidth = 200000;
    var name = "plus";;
    //czmlfile = czml.createCorridor(name + "c", name, name, linewidth, color, referencesvalues, czmlfile);
    czmlfile = czml.createPolyline(name + "p", name, name, 3, color, referencesvalues, czmlfile);

    var referencesvalues = [];
    var bearing = p2.initialBearingTo(p1).toFixed(20);

    for (var i=80, tot=1; i>=tot; i--) {
      var distance = i * 2000000;
      var destpoints = p2.destinationPoint(distance, bearing);

      var name = "-" + i;
      referencesvalues.push(Number(destpoints['lon']));
      referencesvalues.push(Number(destpoints['lat']));
      referencesvalues.push(Number(0));

    }

    referencesvalues.push(Number(lon1));
    referencesvalues.push(Number(lat1));
    referencesvalues.push(Number(0));

    var color = [119, 255, 85, 255];
    var linewidth = 20000;
    var name = "minus";;
    //czmlfile = czml.createCorridor(name + "c", name, name, linewidth, color, referencesvalues, czmlfile);
    czmlfile = czml.createPolyline(name + "p", name, name, 3, color, referencesvalues, czmlfile);

  }

  return res.json(czmlfile);

};

export async function exportGrid(req, res, pool) {

  const { latitude, longitude, bearing, form, category, solid, type } = req.params;

  // Daten vorbereiten
  const solids = JSON.parse(JSON.stringify(leylinesSolids[category][solid]));
  const points = await leylinesSolids.getPoints(latitude, longitude, bearing, form, solids.points);

  const styleId = `${category}-${solid}-${type}`;
  const styles = {
    highlight: { color: "ff00d7ff", width: 5 },
    color: solids.color,
    distance: solids.distance
  };

  const kmlName = `${category.charAt(0).toUpperCase() + category.slice(1)} ${solid.charAt(0).toUpperCase() + solid.slice(1)}`;

  try {
    // 1. Header starten (jetzt synchron)
    let kmlContent = kml.getHeader(kmlName);

    // 2. Styles nur für Linien hinzufügen
    if (type === "lines") {
      // Wir nutzen direkt die neue String-Logik
      kmlContent += kml.getLineStyleMap(styleId);
      kmlContent += kml.getLineStyle(styleId, styles);
    }

    // 3. Geometrie generieren
    // Wir übergeben points und solids an eine saubere Generator-Funktion
    const geometryString = kml.getGeometry(solids, points, category, solid, type, latitude, longitude, bearing);
    kmlContent += geometryString;

    // 4. Footer dran
    kmlContent += kml.getFooter();

    const filename = `${category}_${form}_${solid}_${type}_${latitude}_${longitude}_${bearing}.kml`;
    
    res.header('Content-Type', 'application/vnd.google-earth.kml+xml');
    res.attachment(filename);
    return res.status(200).send(kmlContent);

  } catch (error) {
    console.error("Grid Export Error:", error);
    return res.status(500).send('Internal Server Error');
  }
}

export async function exportPOI(req, res, pool) {
  const { schema, table, type } = req.params;
  const maintable = `${schema}.${table}`;

  // Wir holen uns die Daten direkt mit Geometrie als WKT
  const select = `
    SELECT id, site AS name, description, x_coord, y_coord, z_coord, ST_AsText(geom) as wkt
    FROM ${maintable}
    WHERE type = $1
  `;

  try {
    // 1. Header und Styles synchron generieren
    let kmlContent = kml.getHeader("Points of Interest");
    kmlContent += kml.getPointStyle(type);

    // 2. Die Punkte aus der DB holen (die einzige async-Aktion)
    const pointsKml = await postgis.pgExportPoint(pool, select, [type], type);
    kmlContent += pointsKml;

    // 3. Footer dran
    kmlContent += kml.getFooter();

    const filename = `${type}.kml`;
    res.header('Content-Type', 'application/vnd.google-earth.kml+xml'); // Korrekter MIME-Type
    res.attachment(filename);
    return res.send(kmlContent);

  } catch (error) {
    console.error('KML Export Error:', error);
    return res.status(500).send('Internal Server Error');
  }
};

// optimiert
export async function createDelaunay(req, res, pool) {

  const { schema, table, width, color, group } = req.params;
  const maintable = `${schema}.${table}`;
  const linewidth = parseInt(width) || 1;
  const colorArray = color.split(",").map(x => parseInt(x));

  try {
    const header = czml.createHeader();
    const packets = await postgis.pgGetDelaunay(pool, maintable, linewidth, colorArray, group);
    const czmlfile = [...header, ...packets];
    return res.json(czmlfile);
  } catch (error) {
    console.error(`Error in createDelaunay [${maintable}]:`, error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// optimiert
export async function createVoronoi(req, res, pool) {

  const { schema, table, width, color, group } = req.params;
  const maintable = `${schema}.${table}`;
  const linewidth = parseInt(width) || 1;
  const colorArray = color.split(",").map(x => parseInt(x));

  try {
    const header = czml.createHeader();
    const packets = await postgis.pgGetVoronoi(pool, maintable, linewidth, colorArray, group);
    const czmlfile = [...header, ...packets];
    return res.json(czmlfile);
  } catch (error) {
    console.error(`Error in createVoronoi [${maintable}]:`, error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function createLine(req, res, pool) {
  const { schema, table, group, width, color, type } = req.params;
  const maintable = `${schema}.${table}`;
  
  let linewidth = parseInt(width);
  let colorString = color;

  // 1. Vordefinierte Typen (Mapping statt Switch wäre auch möglich, aber Switch ist hier klar)
  switch (type) {
    case 'major':
      colorString = '255,255,255';
      linewidth = 15000;
      break;
    case 'basic':
      colorString = '255,255,66';
      linewidth = 5000;
      break;
    case 'minor':
      colorString = '255,165,0';
      linewidth = 500;
      break;
  }

  const colorArray = colorString.split(",").map(x => parseInt(x));
  
  // 2. Header initialisieren
  const packets = czml.createHeader();

  try {
    // 3. Geometrien holen (Asynchron, da DB-Abfrage)
    const linePackets = await postgis.pgGetMultiline(pool, maintable, group, linewidth, colorArray, type);
    packets.push(...linePackets);

    // 4. Zugehörige POIs finden
    const poiPackets = await postgis.pgFindGisPOI(pool, group, linewidth, colorArray, type);
    packets.push(...poiPackets);

    return res.json(packets);
  } catch (error) {
    console.error('Error creating line:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export async function exportLine(req, res, pool) {
  const kml = require('./createKml');
  const postgis = require('./postGIS');
  var { schema, table, group, width, color, type } = req.params;

  const maintable = `${schema}.${table}`;
  var linewidth = parseInt(width);

  switch (type) {
    case 'major':
      color = '255,255,255';
      linewidth = 15000;
      break;
    case 'basic':
      color = '255,255,66';
      linewidth = 5000;
      break;
    case 'minor':
      color = '255,165,0';
      linewidth = 500;
      break;
  }

  const colorArray = color.split(",").map(x => parseInt(x));

  const styles = {
    highlight: {
      color: "#ff00d7ff",
      width: 5
    },
    color: colorArray,
    distance: linewidth
  };

  const kmlName = group;
  let kmlfile = [];
  const kmlHeader = await kml.getHeader(kmlName);
  const kmlFooter = await kml.getFooter();
  const kmlStyleMap = await kml.getLineStyleMap(group);
  const kmlStyle = await kml.getLineStyle(group, styles);

  try {
    kmlfile = await postgis.pgExportMultiline(kmlfile, pool, maintable, group, linewidth, colorArray, type);
    kmlfile = kmlHeader.concat(kmlStyleMap, kmlStyle, kmlfile, kmlFooter);
    const filename = `${group}.kml`;
    res.header('Content-Type', 'text/xml');
    res.attachment(filename);
    res.status(200).send(kmlfile.join('\n'));
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

export async function createArrow(req, res, pool) {
  const { schema, table, group, width, color } = req.params;
  const maintable = `${schema}.${table}`;
  const colorArray = color.split(",").map(Number);
  
  // Header synchron starten
  const packets = czml.createHeader();

  try {
    // Pfeil-Pakete von PostGIS holen
    const arrowPackets = await postgis.pgCreateArrow(pool, maintable, group, width, colorArray);
    packets.push(...arrowPackets);

    return res.json(packets);
  } catch (error) {
    console.error('Error creating arrow:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function createArea(req, res, pool) {

   var maintable = req.params.schema + "." + req.params.table;
   var color = [255,178,102,100];
   var extrudeheight = 10000;

   var czmlfile = [];

   czmlfile = await czml.createHeader(czmlfile);
   czmlfile = await postgis.pgCreateArea(czmlfile, pool, maintable, req.params.name, color, extrudeheight);
   return res.json(czmlfile);
};
