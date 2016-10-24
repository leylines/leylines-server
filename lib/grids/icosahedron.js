'use strict';

var geometry = require('../createGeometry');
var czml = require('../createCzml');

exports.level1 = function(data, results) {

    var line;
    var description;
    var linewidth = 300000.0;
    var colorvalue = [255,255,255];

    line = [8, 11, 7, 8, 4, 11, 1, 7, 2, 8];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [9, 10, 5, 9, 6, 10, 2, 5, 1, 9];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [4, 3, 6, 4, 0, 6];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [11, 3, 9];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [8, 0, 10];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [7, 5];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [0, 2];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [1, 3];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    return results;
}

exports.level2 = function(data, results) {

    var line;
    var description;
    var linewidth = 150000.0;
    var colorvalue = [255,255,255];

    line = [8, 1, 9, 0, 8];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [8, 7, 9, 6, 8];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [4, 8, 5, 9, 4];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [8, 2, 9, 3, 8];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [8, 11, 9, 10, 8];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [7, 5, 6, 4, 7];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [7, 1, 6, 0, 7];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [7, 10, 6, 11, 7];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [7, 3, 6, 2, 7];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [5, 1, 4, 0, 5];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [5, 3, 4, 2, 5];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [5, 10, 4, 11, 5];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [3, 11, 2, 10, 3];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [3, 0, 2, 1, 3];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [11, 1, 10, 0, 11];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    return results;
}

exports.area = function(colors,results) {

    var polygon = [];
    var polygonid;
    var extrudeheight = 10000;
    var polygonreference = [];

    polygon = [11, 7, 8];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[1], extrudeheight, polygonreference, results);

    polygon = [7, 8, 2];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[2], extrudeheight, polygonreference, results);

    polygon = [11, 1, 7];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[4], extrudeheight, polygonreference, results);

    polygon = [1, 7, 5];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[5], extrudeheight, polygonreference, results);

    polygon = [11, 3, 1];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[19], extrudeheight, polygonreference, results);

    polygon = [3, 1, 9];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[20], extrudeheight, polygonreference, results);

    polygon = [11, 4, 3];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[10], extrudeheight, polygonreference, results);

    polygon = [4, 3, 6];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[11], extrudeheight, polygonreference, results);

    polygon = [11, 8 ,4];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[13], extrudeheight, polygonreference, results);

    polygon = [8, 4, 0];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[14], extrudeheight, polygonreference, results);

    polygon = [7, 2, 5];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[11], extrudeheight, polygonreference, results);

    polygon = [2, 5, 10];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[10], extrudeheight, polygonreference, results);

    polygon = [8, 2, 0];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[20], extrudeheight, polygonreference, results);

    polygon = [2, 0, 10];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[19], extrudeheight, polygonreference, results);

    polygon = [4, 0, 6];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[5], extrudeheight, polygonreference, results);

    polygon = [0, 6, 10];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[4], extrudeheight, polygonreference, results);

    polygon = [3, 9, 6];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[2], extrudeheight, polygonreference, results);

    polygon = [9, 6, 10];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[1], extrudeheight, polygonreference, results);

    polygon = [1, 9, 5];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[14], extrudeheight, polygonreference, results);

    polygon = [9, 5, 10];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[13], extrudeheight, polygonreference, results);

    return results;
}
