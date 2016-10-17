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

exports.level2 = function(data, results) {

    var line;
    var description;
    var linewidth = 150000.0;
    var colorvalue = [255,255,255];

    line = [6, 4, 7, 5, 6];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [11, 8, 10, 9, 11];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [1, 13, 0, 12, 1];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [12, 8, 13, 9, 12];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [8, 18, 9, 16, 8];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [18, 7, 16, 6, 18];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [17, 7, 14, 6, 17];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [5, 13, 4, 12, 5];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [3, 16, 2, 18, 3];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [19, 4, 15, 5, 19];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [17, 1, 14, 0, 17];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [11, 17, 10, 14, 11];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [1, 3, 0, 2, 1];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [3, 19, 2, 15, 3];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [19, 11, 15, 10, 19];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    return results;
}

exports.area = function(colors,results) {

    var polygon = [];
    var polygonid;
    var extrudeheight = 10000;
    var polygonreference = [];

    polygon = [3, 1, 17, 11, 19];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[0], extrudeheight, polygonreference, results);

    polygon = [8, 11, 17, 7, 18];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[1], extrudeheight, polygonreference, results);

    polygon = [4, 19, 11, 8, 12];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[2], extrudeheight, polygonreference, results);


    polygon = [17, 1, 13, 5, 7];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[3], extrudeheight, polygonreference, results);

    polygon = [1, 3, 16, 9, 13];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[4], extrudeheight, polygonreference, results);

    polygon = [13, 9, 10, 15, 5];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[5], extrudeheight, polygonreference, results);


    polygon = [3, 19, 4, 6, 16];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[9], extrudeheight, polygonreference, results);

    polygon = [6, 4, 12, 0, 14];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[10], extrudeheight, polygonreference, results);

    polygon = [16, 6, 14, 10, 9];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[11], extrudeheight, polygonreference, results);


    polygon = [7, 5, 15, 2, 18];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[12], extrudeheight, polygonreference, results);

    polygon = [8, 18, 2, 0, 12];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[13], extrudeheight, polygonreference, results);

    polygon = [2, 15, 10, 14, 0];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[14], extrudeheight, polygonreference, results);

    return results;
}
