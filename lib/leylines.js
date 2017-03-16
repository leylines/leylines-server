'use strict';

exports.createCircle = function(req, res, connectionString) {

	var czml = require('./createCzml');

	var lat1 = req.params.lat1;
	var lon1 = req.params.lon1;
	var lat2 = req.params.lat2;
	var lon2 = req.params.lon2;
	var type = req.params.type;

	var czmlfile = [];
	var czmlfile = czml.createHeader(czmlfile);

	if (type == "spherical") {

		var LatLon = require('geodesy').LatLonSpherical;

		var referencesvalues = [];
		referencesvalues.push(Number(lon1));
		referencesvalues.push(Number(lat1));
		referencesvalues.push(Number(0));

		var p1 = new LatLon(lat1, lon1);
		var p2 = new LatLon(lat2, lon2);

		var bearing = p1.bearingTo(p2);

		for (var i=1, tot=7; i<=tot; i++) {

			var distance = i * 5000000;
			var destpoints = p1.destinationPoint(distance, bearing);

			var name = i;
			referencesvalues.push(Number(destpoints['lon']));
			referencesvalues.push(Number(destpoints['lat']));
			referencesvalues.push(Number(0));

			var color = [119, 17, 85, 64];
			var linewidth = 20000;
			//czmlfile = czml.createCorridorCarto(name + "c", name, name, linewidth, color, referencesvalues, czmlfile);
			czmlfile = czml.createPolylineCarto(name + "p", name, name, 3, color, referencesvalues, czmlfile);
		}

		referencesvalues.push(Number(lon1));
		referencesvalues.push(Number(lat1));
		referencesvalues.push(Number(0));

	} else {

		var LatLon = require('geodesy').LatLonEllipsoid;

		var referencesvalues = [];

		referencesvalues.push(Number(lon1));
		referencesvalues.push(Number(lat1));
		referencesvalues.push(Number(0));

		var p1 = new LatLon(lat1, lon1);
		var p2 = new LatLon(lat2, lon2);

		var bearing = p1.initialBearingTo(p2);

		for (var i=1, tot=10; i<=tot; i++) {

			var distance = i * 2000000;
			var destpoints = p1.destinationPoint(distance, bearing);

			referencesvalues.push(Number(destpoints['lon']));
			referencesvalues.push(Number(destpoints['lat']));
			referencesvalues.push(Number(0));

		}

		var color = [119, 17, 85, 255];
		var linewidth = 200000;
		var name = "plus";;
		//czmlfile = czml.createCorridorCarto(name + "c", name, name, linewidth, color, referencesvalues, czmlfile);
		czmlfile = czml.createPolylineCarto(name + "p", name, name, 3, color, referencesvalues, czmlfile);

		var referencesvalues = [];
		var negbearing = bearing + 180;

		for (var i=10, tot=1; i>=tot; i--) {

			var distance = i * 2000000;
			var destpoints = p1.destinationPoint(distance, negbearing);

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
		//czmlfile = czml.createCorridorCarto(name + "c", name, name, linewidth, color, referencesvalues, czmlfile);
		czmlfile = czml.createPolylineCarto(name + "p", name, name, 3, color, referencesvalues, czmlfile);

	}

	return res.json(czmlfile);

};

exports.createGrid = function(req, res, connectionString) {

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
	var distanceMain   = 120000.0;
	var distanceMinor  = 60000.0;

	czml.createHeader(czmlfile);
	points = solids.calculateGridPoints(lat, lon, azi, shape, type, czmlfile);

    switch (type) {
       case "points":
          async.waterfall([
             geometry.createPoints(res, points, 1, czmlfile, null)
          ], getResult);
          return;
       case "area":
          async.waterfall([
             geometry.createPoints(res, points, 0, czmlfile, eval('grids.area' + shape)),
             geometry.createArea
          ], getResult);
          return;
       case "1":
          async.waterfall([
             geometry.createCorridor(res, connectionString, points, eval('grids.main' + shape), distanceMain, colorMain, czmlfile),
             postgis.pgFindPOI
          ], getResult);
          return;
       case "2":
          async.waterfall([
             geometry.createCorridor(res, connectionString, points, eval('grids.minor' + shape), distanceMinor, colorMinor, czmlfile),
             postgis.pgFindPOI
          ], getResult);
          return;
    }

};

function getResult (err, res, result) {
   if (err) {
      console.log(err);
      res.status(500).send('Something failed!');
   } else {
      return res.json(result);
   }
};

exports.createPOI = function(req, res, connectionString) {

	var czml = require('./createCzml');
	var postgis = require('./postGIS');

	var maintable = req.params.schema + "." + req.params.table;

	var select = "SELECT " + maintable + ".site," + maintable + ".description," + maintable + ".type," + maintable + ".sub_type," + maintable + ".data_owner," + maintable + ".links," + maintable + ".importance," + maintable + ".x_coord," + maintable + ".y_coord," + maintable + ".z_coord," + maintable + ".country" + " FROM "  + maintable  + " WHERE " + maintable + ".type = '" + req.params.type + "';";

	var scale = 0.2;

	var czmlfile = [];

	// Print Header
	czmlfile = czml.createHeader(czmlfile);

	postgis.pgCreatePoint(res, connectionString, select, req.params.type, scale, czmlfile, getResult);

};

exports.createSite = function(req, res, connectionString) {

	var czml = require('./createCzml');
	var postgis = require('./postGIS');

	var maintable = req.params.schema + "." + req.params.table;

	var select = "SELECT * FROM "  + maintable + ";";

	var scale = 0.2;

	var czmlfile = [];

	// Print Header
	czmlfile = czml.createHeader(czmlfile);

	postgis.pgCreatePoint(res, connectionString, select, req.params.table, scale, czmlfile, getResult);

};

exports.createLine = function(req, res, connectionString) {

	var czml = require('./createCzml');
	var postgis = require('./postGIS');

	var maintable = req.params.schema + "." + req.params.table;
	var linewidth = req.params.width;
	var color = req.params.color.split(",");

	var czmlfile  = [];

	// Print Header
	czml.createHeader(czmlfile);

    postgis.pgCreateLine(res, connectionString, maintable, linewidth, color, czmlfile, getResult);
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

	postgis.pgCreateArea(res, connectionString, maintable, req.params.name, color, extrudeheight, czmlfile, getResult);
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

