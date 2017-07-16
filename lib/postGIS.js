'use strict';

exports.pgFindPOI = async function(res, pool, data, lines, distance, color, czmlfile, callback) {

   var czml    = require('./createCzml');
   var html    = require('./createHTML');

   var multilinestring = []; 
   for (var i=0, tot=lines.length; i<tot; i++) {
      var fpointvalues = data[lines[i][0]].split('|');
      var spointvalues = data[lines[i][1]].split('|');
      multilinestring.push("(" + Number(fpointvalues[1]) + " " + Number(fpointvalues[2]) + " 0.0, " + Number(spointvalues[1]) + " " + Number(spointvalues[2]) + " 0.0)");
   }

   const client = await pool.connect();
   try {
      await client.query('BEGIN');
      await client.query('CREATE TEMP TABLE temp_grid(gid serial primary key, geom geometry(MultiLinestringZ,4326))');
      const insertLines = "INSERT INTO temp_grid(geom) VALUES (ST_GeomFromText('MultiLinestringZ(" +  multilinestring.join(",") + ")',4326))";
      await client.query(insertLines)
      const selectPoints = "SELECT * FROM leylines.poi l INNER JOIN temp_grid g ON ST_DWithin(l.geom::geography, g.geom::geography, " + distance + ")";
      const { rows } = await client.query(selectPoints);
      for (i=0, tot=rows.length; i<tot; i++) {
         var icon = "/images/icons/star_" + color[0] + "-" + color[1] + "-" + color[2] + ".png";
         var scale = 0.30;
         var description = html.createFeatureInfo(rows[i]);
         czmlfile = czml.createPoint(rows[i].id, rows[i].site, description, icon, scale, Number(rows[i].x_coord), Number(rows[i].y_coord), Number(rows[i].z_coord), czmlfile);
      }
      await client.query('COMMIT')
   } finally {
      client.release()
     callback(null, res, czmlfile);
   }

};

exports.pgCreatePoint = function(res, pool, select, type, scale, czmlfile, callback) {

   var czml  = require('./createCzml');
   var html  = require('./createHTML');
   var Query = require('pg').Query

   var icon  = "/images/icons/" + type.toLowerCase() + ".png";
   var query = new Query(select);

   var results = pool.query(query, function(err, result) {
      if (err) {
         console.log(err.stack)
         return;
      }
   });

   query.on('row', function(row) {
      var description = html.createFeatureInfo(row);
      czmlfile = czml.createPoint(row.id, row.site, description, icon, scale, row.x_coord, row.y_coord, row.z_coord, czmlfile);
   });

   query.on('end', function() {
      callback(null, res, czmlfile);
   });
};

exports.pgCreateLine = function(res, pool, maintable, linewidth, color, czmlfile, callback) {

   var czml  = require('./createCzml');
   var Query = require('pg').Query

   var id = 0;
   var select = "SELECT ST_AsGeoJSON(geom), name, description FROM " + maintable + ";";
   var query = new Query(select);

   var results = pool.query(query, function(err, result) {
      if (err) {
         console.log(err.stack)
         return;
      }
   });

   query.on('row', function(row) {
      var multilines = JSON.parse(row.st_asgeojson);
      var multiline = [];
      for (var i=0, tot=multilines.coordinates.length; i<tot; i++) {
         multiline.push(multilines.coordinates[i][0]);
         multiline.push(multilines.coordinates[i][1]);
         multiline.push(0.0);
      }
      czmlfile = czml.createCorridorCarto(id, row.name, row.description, linewidth, color, multiline, czmlfile);
      id++;
   });

   query.on('end', function() {
      callback(null, res, czmlfile);
   });

};

exports.pgCreateArea = function(res, pool, maintable, name, color, extrudeheight, czmlfile, callback) {

   var czml  = require('./createCzml');
   var Query = require('pg').Query

   var select = "SELECT ST_AsGeoJSON(geom) FROM " + maintable + " WHERE name = '" + name + "';";
   var query = new Query(select);

   var results = pool.query(query, function(err, result) {
      if (err) {
         console.log(err.stack)
         return;
      }
   });

   query.on('row', function(row) {
      var polygons = JSON.parse(row.st_asgeojson);
      for (var id=0, tot1=polygons.coordinates.length; id<tot1; id++) {
         var polygon = [];
         for (var j=0, tot2=polygons.coordinates[id][0].length; j<tot2; j++) {
            polygon.push(polygons.coordinates[id][0][j][0]);
            polygon.push(polygons.coordinates[id][0][j][1]);
            polygon.push(0.0);
         }
         czmlfile = czml.createPolygonCarto(id, id, id, color, extrudeheight, polygon, czmlfile);
      }
   });

   query.on('end', function() {
      callback(null, res, czmlfile);
   });
};

