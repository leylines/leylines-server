'use strict';

exports.createGrid = function(req, res, connectionString, callback) {

	var czml   = require('./createCzml');
	var math   = require('./Math');
	var solids = require('./platonicSolids');
    var grids  = require('./grids.js');
    var geometry = require('./createGeometry');
    var postgis = require('./postGIS');

    var async  = require('async');

	var czmlfile = [];
	var points = [];

    var lat = req.params.lat1;
    var lon = req.params.lon1;
	var azi = -math.radians(req.params.azi);

    var shape = req.params.shape;
    var type = req.params.type;

    var colors = [
      [119, 17, 85], [170, 68, 136], [204, 153, 187],
      [17, 68, 119], [68, 119, 170], [119, 170, 221],
      [17, 119, 119], [68, 170, 170], [119, 204, 204],
      [17, 119, 68], [68, 170, 119], [136, 204, 170],
      [119, 119, 17], [170, 170, 68], [221, 221, 119],
      [119, 68, 17], [170, 119, 68], [221, 170, 119],
      [119, 17, 34], [170, 68, 85], [221, 119, 136]
    ]

    for (var i = 0; i < colors.length; i++) {
      colors[i].push(64);
    }

    var colorMain  = [255,255,66];
    var colorMinor = [255,165,0];
    var distanceMain   = 60000.0;
    var distanceMinor  = 30000.0;

	czml.createHeader(czmlfile);
	points = solids.calculateGridPoints(lat, lon, azi, shape, type, czmlfile);

    switch (type) {
       case "points":
          async.waterfall([
             geometry.createPoints(points, 1, czmlfile, null)
          ], function(err, czmlfile){
             callback(res, err, czmlfile);
          });
          return;
       case "area":
          async.waterfall([
             geometry.createPoints(points, 0, czmlfile, eval('grids.area' + shape)),
             geometry.createArea
          ], function(err, czmlfile){
             callback(res, err, czmlfile);
          });
          return;
       case "1":
          async.waterfall([
             geometry.createCorridor(connectionString, points, eval('grids.main' + shape), distanceMain, colorMain, czmlfile),
             postgis.pgFindPOI
          ], function(err, czmlfile){
             callback(res, err, czmlfile);
          });
          return;
       case "2":
          async.waterfall([
             geometry.createCorridor(connectionString, points, eval('grids.minor' + shape), distanceMinor, colorMinor, czmlfile),
             postgis.pgFindPOI
          ], function(err, czmlfile){
             callback(res, err, czmlfile);
          });
          return;
    }
	callback(res, err, results);

};

exports.createPOI = function(req, res, connectionString, callback) {

	var czml = require('./createCzml');
	var postgis = require('./postGIS');

	var maintable = req.params.schema + "." + req.params.table;

	var select = "SELECT " + maintable + ".site," + maintable + ".description," + maintable + ".type," + maintable + ".sub_type," + maintable + ".data_owner," + maintable + ".links," + maintable + ".importance," + maintable + ".x_coord," + maintable + ".y_coord," + maintable + ".z_coord," + maintable + ".country" + " FROM "  + maintable  + " WHERE " + maintable + ".type = '" + req.params.type + "';";

	var scale = 0.2;

	var czmlfile = [];

	// Print Header
	czmlfile = czml.createHeader(czmlfile);

	postgis.pgCreatePoint(connectionString, select, req.params.type, scale, czmlfile, function(err, results) {
		callback(res, err, results);
	});
};

exports.createSite = function(req, res, connectionString, callback) {

	var czml = require('./createCzml');
	var postgis = require('./postGIS');

	var maintable = req.params.schema + "." + req.params.table;

	var select = "SELECT * FROM "  + maintable + ";";

	var scale = 0.2;

	var czmlfile = [];

	// Print Header
	czmlfile = czml.createHeader(czmlfile);

	postgis.pgCreatePoint(connectionString, select, req.params.table, scale, czmlfile, function(err, results) {
		callback(res, err, results);
	});
};

exports.createLine = function(req, res, connectionString, callback) {

	var czml = require('./createCzml');
	var postgis = require('./postGIS');

	var maintable = req.params.schema + "." + req.params.table;
	var linewidth = req.params.width;
	var color = req.params.color.split(",");

	var czmlfile  = [];

	// Print Header
	czml.createHeader(czmlfile);

    postgis.pgCreateLine(connectionString, maintable, linewidth, color, czmlfile, function(err, results) {
		callback(res, err, results);
	});
};

exports.createArea = function(req, res, connectionString) {

	var czml = require('./createCzml.js');
	var postgis = require('./postGIS');

	var maintable = req.params.schema + "." + req.params.table;
        var color = [255,178,102,100];
        var extrudeheight = 10000;

	var czmlfile = [];

	// Print Header
	czml.createHeader(czmlfile);

	postgis.pgCreateArea(connectionString, maintable, req.params.name, color, extrudeheight, czmlfile, function(results) {
		callback(res, err, results);
	});
};

exports.createMegalithic = function(req, res, connectionString) {

	var pg = require('pg');
	var czml = require('./createCzml.js');
	var results = [];

	// Print Header
	results = czml.createHeader(results);

	// Get a Postgres client from the connection pool
	pg.connect(connectionString, function(err, client, done) {

		// SQL Query > Select Data
		var querystatement = "SELECT sid, object_type, place, x_coord, y_coord, icon, country FROM megalithic.sites";
		querystatement += " WHERE type_id = '";
		querystatement += req.params.type;
		querystatement += "';";
		var query = client.query(querystatement);

		// Stream results back one row at a time
		query.on('row', function(row) {
			var description = "<!--HTML-->\r\n";
			description += "<table>";
			description += "<tr><td width=\"120px\">Country</td><td width=\"50px\"></td><td>" + row.country + "</td></tr>";
			description += "<tr><td>Type</td><td><img src=\"/images/megalithic/" + row.icon + ".gif\"><td>" + row.object_type + "</td></tr>";
			description += "<tr><td>Data Custodian</td><td></td><td><a href=\"http://www.megalithic.co.uk/article.php?sid=" + row.sid + "\" target=\"_blank\">megalithic.co.uk</a></td></tr>";
			description += "</table>";
			description += "\r\n</p>";
			var icon = "/images/megalithic/" + row.icon + ".gif";
			var scale = 0.7;
			results = czml.createPoint(row.sid, row.place, description, icon, scale, row.x_coord, row.y_coord, 0.0, results);
		});

		// After all data is returned, close connection and return results
		query.on('end', function() {
			client.end();
			return res.json(results);
		});

		// Handle Errors
		if(err) {
			console.log(err);
		}
	});
};

