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
    var color = [];
    var extrudeheight = 10000;
    var polygonreference = [];

    color = [0, 255, 0, 64];

    polygon = [0, 7, 5, 6];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, color, extrudeheight, polygonreference, results);

    color = [153, 255, 153, 64];
    polygon = [5, 1, 3, 6];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, color, extrudeheight, polygonreference, results);

    color = [153, 51, 255, 64];
    polygon = [5, 7, 4, 1];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, color, extrudeheight, polygonreference, results);

    color = [204, 153, 255, 64];
    polygon = [0, 6, 3, 2];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, color, extrudeheight, polygonreference, results);

    color = [255, 128, 0, 64];
    polygon = [7, 0, 2, 4];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, color, extrudeheight, polygonreference, results);

    color = [255, 178, 102, 64];
    polygon = [1, 4, 2, 3];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, color, extrudeheight, polygonreference, results);

}
