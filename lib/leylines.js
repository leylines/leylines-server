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

exports.createSite = function(req, res, connectionString) {

	var pg = require('pg');
	var czml = require('./createCzml');
        var utils = require('./utils')
	var results = [];

	// Print Header
	results = czml.createHeader(results);

	// Get a Postgres client from the connection pool
	pg.connect(connectionString, function(err, client, done) {

		var maintable = req.params.schema + "." + req.params.table;

		// SQL Query > Select Data
		var querystatement = "SELECT " + maintable + ".site,";
		querystatement += maintable + ".description,";
		querystatement += maintable + ".type,";
		querystatement += maintable + ".sub_type,";
		querystatement += maintable + ".data_owner,";
		querystatement += maintable + ".links,";
		querystatement += maintable + ".importance,";
		querystatement += maintable + ".x_coord,";
		querystatement += maintable + ".y_coord,";
		querystatement += maintable + ".z_coord,";
		querystatement += maintable + ".country";
		querystatement += " FROM "  + maintable  + " WHERE ";
		querystatement += maintable + ".type = \'";
		querystatement += req.params.type;
		querystatement += "\';";
		// console.log(querystatement);
		var query = client.query(querystatement);
		var id = 1;

		// Stream results back one row at a time
		query.on('row', function(row) {
			if (!row.description) {
				row.description = row.site;
			}
			var wikipedialink = "<a href=\"https://en.wikipedia.org/wiki/" + row.site.replace(/ /g, "_") + "\">" + row.site + "</a>";
			var links = "<a href=\"" + row.links + "\">" + row.links + "</a>";
			var icon = "/images/" + req.params.icon;
			var scale = 0.2;
			var description = "<!--HTML-->";
			var image = "/popup/" + row.site.replace(/ /g, "_") + ".jpg";
			description += "<table>";
			if (utils.fileExists(image)) {
				description += "<tr><td colspan=\"2\"><img src=\"/images" +  image + "\" alt=\"" + row.site + "\" style=\"width:360px\"></td></tr>"; 
			}
			description += "<tr><td style=\"width: 360px; padding: 4px\" colspan=\"2\">" + row.description + "</td></tr>";
			if (row.type != "unknown") {
				description += "<tr><td style=\"width: 120px; padding: 4px\">Type:</td><td style=\"width: 240px\">" + row.type + "</td></tr>";
			}
			if (row.sub_type != "unknown") {
				description += "<tr><td style=\"width: 120px; padding: 4px\">Subtype:</td><td style=\"width: 240px\">" + row.sub_type + "</td></tr>";
			}
			description += "<tr><td style=\"width: 120px; padding: 4px\">Wikipedia:</td><td style=\"width: 240px\">" + wikipedialink + "</td></tr>";
			if (row.importance != "local") {
				description += "<tr><td style=\"width: 120px; padding: 4px\">Importance:</td><td style=\"width: 240px\">" + row.importance + "</td></tr>";
			}
			if (row.data_owner) {
				description += "<tr><td style=\"width: 120px; padding: 4px\">Custodian:</td><td style=\"width: 240px\">" + row.data_owner + "</td></tr>";
			}
			if (row.links) {
				description += "<tr><td style=\"width: 120px; padding: 4px\">Links:</td><td style=\"width: 240px\">" + links + "</td></tr>";
			}
			if (row.country) {
				description += "<tr><td style=\"width: 120px; padding: 4px\">Country:</td><td style=\"width: 240px\">" + row.country + "</td></tr>";
			}
			description += "</table>";
			results = czml.createPoint(id, row.site, description, icon, scale, row.x_coord, row.y_coord, row.z_coord, results);
			id++;
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

exports.createPole = function(req, res, connectionString) {

	var pg = require('pg');
	var czml = require('./createCzml.js');
	var results = [];

	// Print Header
	results = czml.createHeader(results);

	// Get a Postgres client from the connection pool
	pg.connect(connectionString, function(err, client, done) {

		// SQL Query > Select Data
		var querystatement = "SELECT year, x_coord, y_coord, z_coord, country FROM environment.";
		querystatement += req.params.table;
		querystatement += " ;";
		var query = client.query(querystatement);
		var id = 1;

		// Stream results back one row at a time
		query.on('row', function(row) {
			var icon = "/images/icons/button_" + req.params.icon + ".svg";
			var scale = 0.03;
			var description = row.year;
			var site = row.year;
			results = czml.createPoint(id, site, description, icon, scale, row.x_coord, row.y_coord, row.z_coord, results);
			id++;
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
