'use strict';

var geometry = require('../createGeometry');
var czml = require('../createCzml');

exports.level1 = function(data, results) {

    var line;
    var description;
    var linewidth = 300000.0;
    var colorvalue = [255,255,255];

    line = [0, 7, 5, 6, 0];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [6, 3, 2, 0];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [2, 4, 7];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [4, 1, 5];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [3, 1];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    return results;
}

exports.area = function(results) {

	var czml = require('./createCzml.js');

    var polygon = [];
    var polygonid;
    var color = [];
    var extrudeheight = 10000;
    var polygonreference = [];

    color = [0, 255, 0, 64];

    polygon = [0, 7, 5, 6];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, color, extrudeheight, polygonreference, results);

}
