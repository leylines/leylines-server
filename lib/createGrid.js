'use strict';

var async = require('async');
var geometry = require('./createGeometry');
var postgis = require('./postGIS');
    
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
var lineMain   = 120000.0;
var lineMinor  = 60000.0;

exports.createGrid = function(connectionString, data, shape, level, czmlfile, callback) {

    var grids = require('./grids.js');

    switch (shape) {

        case "beckerhagens":

            switch (level) {
                case "points":
                    czmlfile = geometry.createPoints(data, 1, czmlfile);
                    callback(czmlfile);
                    return;
                case "area":
                    czmlfile = geometry.createPoints(data, 0, czmlfile);
                    czmlfile = geometry.createArea(grids.beckerhagensArea, czmlfile);
                    callback(czmlfile);
                    return;
                case "1":
                    async.waterfall([
                       geometry.createCorridor(connectionString, data, grids.beckerhagensMain, lineMain, colorMain, czmlfile),
                       postgis.pgFindPOI,
                       ], function(err, czmlfile){
                          callback(czmlfile);
                    });
                    return;
                case "2":
                    async.waterfall([
                       geometry.createCorridor(connectionString, data, grids.beckerhagensMinor, lineMinor, colorMinor, czmlfile),
                       postgis.pgFindPOI,
                       ], function(err, czmlfile){
                          callback(czmlfile);
                    });
                    return;
            } 

        case "cube":
            switch (level) {
                case "points":
                    czmlfile = geometry.createPoints(data, 1, czmlfile);
                    callback(czmlfile);
                    return;
                case "area":
                    czmlfile = geometry.createPoints(data, 0, czmlfile);
                    czmlfile = geometry.createArea(grids.cubeArea, czmlfile);
                    callback(czmlfile);
                    return;
                case "1":
                    async.waterfall([
                       geometry.createCorridor(connectionString, data, grids.cubeMain, lineMain, colorMain, czmlfile),
                       postgis.pgFindPOI,
                       ], function(err, czmlfile){
                          callback(czmlfile);
                    });
                    return;
                case "2":
                    async.waterfall([
                       geometry.createCorridor(connectionString, data, grids.cubeMinor, lineMinor, colorMinor, czmlfile),
                       postgis.pgFindPOI,
                       ], function(err, czmlfile){
                          callback(czmlfile);
                    });
                    return;
            } 

        case "dodecahedron":
            switch (level) {
                case "points":
                    czmlfile = geometry.createPoints(data, 1, czmlfile);
                    callback(czmlfile);
                    return;
                case "area":
                    czmlfile = geometry.createPoints(data, 0, czmlfile);
                    czmlfile = geometry.createArea(grids.dodecahedronArea, czmlfile);
                    callback(czmlfile);
                    return;
                case "1":
                    async.waterfall([
                       geometry.createCorridor(connectionString, data, grids.dodecahedronMain, lineMain, colorMain, czmlfile),
                       postgis.pgFindPOI,
                       ], function(err, czmlfile){
                          callback(czmlfile);
                    });
                    return;
                case "2":
                    async.waterfall([
                       geometry.createCorridor(connectionString, data, grids.dodecahedronMinor, lineMinor, colorMinor, czmlfile),
                       postgis.pgFindPOI,
                       ], function(err, czmlfile){
                          callback(czmlfile);
                    });
                    return;
            } 

        case "icosahedron":
            switch (level) {
                case "points":
                    czmlfile = geometry.createPoints(data, 1, czmlfile);
                    callback(czmlfile);
                    return;
                case "area":
                    czmlfile = geometry.createPoints(data, 0, czmlfile);
                    czmlfile = geometry.createArea(grids.icosahedronArea, czmlfile);
                    callback(czmlfile);
                    return;
                case "1":
                    async.waterfall([
                       geometry.createCorridor(connectionString, data, grids.icosahedronMain, lineMain, colorMain, czmlfile),
                       postgis.pgFindPOI,
                       ], function(err, czmlfile){
                          callback(czmlfile);
                    });
                    return;
                case "2":
                    async.waterfall([
                       geometry.createCorridor(connectionString, data, grids.icosahedronMinor, lineMinor, colorMinor, czmlfile),
                       postgis.pgFindPOI,
                       ], function(err, czmlfile){
                          callback(czmlfile);
                    });
                    return;
            } 


        case "tetrahedron":
            switch (level) {
                case "points":
                    czmlfile = geometry.createPoints(data, 1, czmlfile);
                    callback(czmlfile);
                    return;
                case "area":
                    czmlfile = geometry.createPoints(data, 0, czmlfile);
                    czmlfile = geometry.createArea(grids.tetrahedronArea, czmlfile);
                    callback(czmlfile);
                    return;
                case "1":
                    async.waterfall([
                       geometry.createCorridor(connectionString, data, grids.tetrahedronMain, lineMain, colorMain, czmlfile),
                       postgis.pgFindPOI,
                       ], function(err, czmlfile){
                          callback(czmlfile);
                    });
                    return;
                case "2":
                    async.waterfall([
                       geometry.createCorridor(connectionString, data, grids.tetrahedronMain, lineMinor, colorMinor, czmlfile),
                       postgis.pgFindPOI,
                       ], function(err, czmlfile){
                          callback(czmlfile);
                    });
                    return;
            } 

        case "octahedron":
            switch (level) {
                case "points":
                    czmlfile = geometry.createPoints(data, 1, czmlfile);
                    callback(czmlfile);
                    return;
                case "area":
                    czmlfile = geometry.createPoints(data, 0, czmlfile);
                    czmlfile = geometry.createArea(grids.octahedronArea, czmlfile);
                    callback(czmlfile);
                    return;
                case "1":
                    async.waterfall([
                       geometry.createCorridor(connectionString, data, grids.octahedronMain, lineMain, colorMain, czmlfile),
                       postgis.pgFindPOI,
                       ], function(err, czmlfile){
                          callback(czmlfile);
                    });
                    return;
                case "2":
                    async.waterfall([
                       geometry.createCorridor(connectionString, data, grids.octahedronMain, lineMinor, colorMinor, czmlfile),
                       postgis.pgFindPOI,
                       ], function(err, czmlfile){
                          callback(czmlfile);
                    });
                    return;
            } 

    }
}

exports.createLinesLevel1 = function(data, level, results) {

	var referencesvalues = [];
	var pointvalues = [];
	var line = [];
	var description;

	// Giza Cross

	var linewidth = 700000.0;
	var colorvalue = [255,255,255];

	description  = "Giza - Vatican -Carnac";
	line = [28, 32, 31, 4, 34, 6, 29 , 33, 30, 5, 35, 7, 28];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Giza - Gobekli Tepe";
	line = [8, 32, 11, 27, 37, 25, 9, 33, 10, 26, 36, 24, 8];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Giza";
	line = [20, 35, 22, 1, 37, 3, 21, 34, 23, 0, 36, 2, 20];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	var linewidth = 200000.0;

	description  = "Tibet - Hawaii";
	line = [28, 36, 29, 37, 28];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "";
	line = [54, 46, 52, 60, 37, 55, 47, 48, 56, 36, 54];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);


	var linewidth = 300000.0;
	var colorvalue = [255,128,0];

	description  = "Carnac - New Zealand";
	line = [31, 44, 27, 1, 55, 13, 30, 40, 26, 0, 54, 12, 31];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Mohenjo Daro - Lake Baikal";
	line = [59, 18, 28, 42, 27, 3, 57, 16, 29, 45, 26, 2, 59];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "";
	line = [24, 43, 28, 17, 58, 1, 25, 41, 29, 14, 61, 0, 24];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Carnac - Varanasi - Uluru";
	line = [45, 14, 23, 46, 31, 11, 42, 17, 22, 47, 30, 10, 45];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "";
	line = [7, 22, 55, 25, 16, 49, 6, 23, 54, 24, 18, 51, 7];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "South Pole - Mount Shasta - North Pole";
	line = [20, 51, 28, 11, 44, 19, 21, 49, 29, 10, 40, 15, 20];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Tiwanaku";
	line = [27, 19, 52, 4, 23, 61, 26, 15, 48, 5, 22, 58, 27];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Atlantis";
	line = [24, 59, 20, 5, 47, 13, 25, 57, 21, 4, 46, 12, 24];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	linewidth = 300000.0;
	colorvalue = [128,255,0];

	description  = "Giza - Mali - Fiji - Tibet";
	line = [38, 32, 42, 58, 55, 39, 33, 45, 61, 54, 38];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Giza - Ankara- Crimea - Hawaii";
	line = [43, 32, 44, 60, 57, 41, 33, 40, 56 ,59, 43];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Maya - New Delhi";
	line = [42, 44, 52, 34, 53, 45, 40, 48, 35, 50, 42];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Mu - Mali - Madagaskar - Atlantis";
	line = [43, 38, 46, 34, 49, 41, 39, 47, 35, 51, 43];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);


	// Switzerland

	colorvalue = [255,0,0];
	linewidth = 700000.0;

	description  = "Carnac - Switzerland - Gobekli Tepe";
	line = [31, 50, 30, 53, 31];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Carnac - Stonehenge - North Pole - Southpole - Mali";
	line = [24, 38, 31, 19, 60, 3, 25, 39, 30, 15, 56, 2, 24];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Cambodia - Japan";
	line = [59, 51, 50, 58, 37, 57, 49, 53, 61, 36, 59];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	linewidth = 200000.0;

	description  = "";
	line = [8, 28, 50, 22, 13, 39, 9, 29, 53, 23, 12, 38, 8];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Banff - Lake Baikal";
	line = [14, 53, 6, 21, 60, 27, 17, 50, 7, 20, 56, 26, 14];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Etna";
	line = [38, 27, 39, 26, 38];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Konga Pass";
	line = [53, 19, 50, 15, 53];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);


	colorvalue = [255,255,0];
	linewidth = 150000.0;

	description  = "Teotihuacan - Mount Shasta";
	line = [61, 3, 58, 7, 2, 61];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);
	
	description  = "Tiwanaku - Alaska - Cambodia";
	line = [61, 20, 58, 21, 61];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);


	colorvalue = [255,0,255];
	linewidth = 150000.0;

	description  = "";
	line = [61, 9, 58, 8, 61];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Tiwanaku";
	line = [61, 34, 60, 58, 35, 56, 61];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Carnac - Ireland";
	line = [8, 31, 52, 21, 16, 41, 9, 30, 48, 20, 18, 43, 8];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Externsteine";
	line = [61, 31, 58, 30, 61];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);


	colorvalue = [0,128,255];
	linewidth = 150000.0;

	description  = "Konga Pass";
	line = [45, 24, 42, 25, 45];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	return results;


	colorvalue = [0,0,255];
	linewidth = 100000.0;

	description  = "Omsk - Madagaskar";
	line = [28, 60, 29, 56, 28];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Hawaii";
	line = [41, 19, 43 ,15, 41];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);


};

