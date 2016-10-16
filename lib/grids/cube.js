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

    var polygon = [];
    var polygonid;
    var extrudeheight = 10000;
    var polygonreference = [];

    polygon = [0, 7, 5, 6];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[2], extrudeheight, polygonreference, results);

    polygon = [5, 1, 3, 6];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[5], extrudeheight, polygonreference, results);

    polygon = [5, 7, 4, 1];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[11], extrudeheight, polygonreference, results);

    polygon = [0, 6, 3, 2];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[14], extrudeheight, polygonreference, results);

    polygon = [7, 0, 2, 4];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[17], extrudeheight, polygonreference, results);

    polygon = [1, 4, 2, 3];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[20], extrudeheight, polygonreference, results);

    return results;
}
