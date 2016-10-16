'use strict';

var geometry = require('../createGeometry');
var czml = require('../createCzml');

exports.level1 = function(data, results) {

    var line;
    var description;
    var linewidth = 300000.0;
    var colorvalue = [255,255,255];

    line = [4, 12, 8, 11, 19, 4];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [4, 6, 16, 3, 19];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [16, 9, 13, 1, 3];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [13, 5, 7, 17, 1];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [8, 18, 2, 0, 12];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [0, 14, 6];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [14, 10, 9];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [10, 15, 5];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [15, 2];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [18, 7];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [17, 11];
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
    polygon = [8, 11, 17, 7, 18];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, color, extrudeheight, polygonreference, results);

    color = [153, 255, 153, 64];
    polygon = [17, 1, 13, 5, 7];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, color, extrudeheight, polygonreference, results);

    color = [153, 51, 153, 64];
    polygon = [7, 5, 15, 2, 18];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, color, extrudeheight, polygonreference, results);

    color = [204, 153, 255, 64];
    polygon = [13, 9, 10, 15, 5];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, color, extrudeheight, polygonreference, results);

    color = [255, 128, 0, 64];
    polygon = [1, 3, 16, 9, 13];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, color, extrudeheight, polygonreference, results);

    color = [255, 178, 102, 64];
    polygon = [16, 6, 14, 10, 9];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, color, extrudeheight, polygonreference, results);

    color = [0, 0, 255, 64];
    polygon = [3, 19, 4, 6, 16];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, color, extrudeheight, polygonreference, results);

    color = [102, 102, 255, 64];
    polygon = [6, 4, 12, 0, 14];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, color, extrudeheight, polygonreference, results);

    color = [255, 128, 0, 64];
    polygon = [4, 19, 11, 8, 12];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, color, extrudeheight, polygonreference, results);

    color = [255, 178, 102, 64];
    polygon = [8, 18, 2, 0, 12];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, color, extrudeheight, polygonreference, results);

    color = [153, 51, 255, 64];
    polygon = [3, 1, 17, 11, 19];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, color, extrudeheight, polygonreference, results);

    color = [204, 153, 255, 64];
    polygon = [2, 15, 10, 14, 0];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, color, extrudeheight, polygonreference, results);

    return results;
}

