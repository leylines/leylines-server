'use strict';

exports.pgFindPOI = function(connectionString, data, lines, czmlfile, callback) {

   var czml  = require('./createCzml');
   var html  = require('./createHTML');
   var pg    = require('pg');
 
   pg.connect(connectionString, function(err, client) {

      client.query("CREATE TEMP TABLE temp_grid(gid serial primary key, geom geometry(MultiLinestringZ,4326))");

      var multilinestring = []; 
      for (var i=0, tot=lines.length; i<tot; i++) {
         var fpointvalues = data[lines[i][0]].split('|');
         var spointvalues = data[lines[i][1]].split('|');
         multilinestring.push("(" + Number(fpointvalues[1]) + " " + Number(fpointvalues[2]) + " 0.0, " + Number(spointvalues[1]) + " " + Number(spointvalues[2]) + " 0.0)");
      }
      var query = "INSERT INTO temp_grid(geom) VALUES (ST_GeomFromText('MultiLinestringZ(" +  multilinestring.join(",") + ")',4326))";
      client.query(query);

      var query = client.query("SELECT * FROM leylines.poi l INNER JOIN temp_grid g ON ST_DWithin(l.geom::geography, g.geom::geography, 10000);");
      var id = 1;
      query.on('row', function(row, result) {

         var icon = "/images/button_yellow.svg";
         var scale = 0.05;

         var description = html.createFeatureInfo(row);

         czmlfile = czml.createPoint(id, row.site, description, icon, scale, Number(row.x_coord), Number(row.y_coord), Number(row.z_coord), czmlfile);
         id++;
      });
      query.on('end', function () {
         callback(null, czmlfile);
         client.end();
      });
   })
};

exports.pgCreateLine = function(connectionString, maintable, linewidth, color, czmlfile) {

   var czml  = require('./createCzml');
   //var html  = require('./createHTML');
   var pg    = require('pg');

   pg.connect(connectionString, function(err, client) {

      var select = "SELECT ST_AsGeoJSON(geom), name, description FROM " + maintable + ";";
      var id = 0;

      var query = client.query(select);
      query.on('row', function(row) {
         var multilines = JSON.parse(row.st_asgeojson);
         var multiline = [];
         for (var i=0, tot=multilines.coordinates.length; i<tot; i++) {
            multiline.push(multilines.coordinates[i][0]);
            multiline.push(multilines.coordinates[i][1]);
            multiline.push(0.0);
         }
         czmlfile = czml.createCorridorCarto(id, row.name, row.description, width, color, multiline[i], czmlfile);
         id++;
      });

      query.on('end', function() {
         callback(null, czmlfile);
         client.end();
      });

      // Handle Errors
      if(err) {
         console.log(err);
      }
   });
};

exports.pgCreateArea = function(connectionString, maintable, name, color, extrudeheight, czmlfile) {

   var czml  = require('./createCzml');
   //var html  = require('./createHTML');
   var pg    = require('pg');

   pg.connect(connectionString, function(err, client, done) {

      var select = "SELECT ST_AsGeoJSON(geom) FROM " + maintable + " WHERE name = '" + name + "';";
      var id = 0;

      var query = client.query(select);
      query.on('row', function(row) {
         var polygons = JSON.parse(row.st_asgeojson);
         var polygon = [];
         for (var i=0, tot1=polygons.coordinates.length; i<tot1; i++) {
            for (var j=0, tot2=polygons.coordinates[i][0].length; j<tot2; j++) {
               polygon.push(polygons.coordinates[i][0][j][0]);
               polygon.push(polygons.coordinates[i][0][j][1]);
               polygon.push(0.0);
            }
         }
         czmlfile = czml.createPolygonCarto(id, id, id, color, extrudeheight, polygon, czmlfile);
         id++;
      });

      query.on('end', function() {
         callback(null, czmlfile);
         client.end();
      });

      // Handle Errors
      if(err) {
         console.log(err);
      }
   });
};

