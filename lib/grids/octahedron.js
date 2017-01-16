'use strict';

var geometry = require('../createGeometry');
var czml = require('../createCzml');

exports.level1 = function(data, results) {

    var line;
    var description;
    var linewidth = 300000.0;
    var colorvalue = [255,255,255];

var lines = [[0,2],[2,4],[4,0],[0,3],[3,4],[4,1],[1,3],[3,5],[5,1],[1,2],[2,5],[5,0]];
    line = [0, 2, 4, 0, 3, 4, 1, 3];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [3, 5, 1, 2];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [2, 5, 0];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    return results;
}

exports.area = function(colors,results) {

    var polygon = [];
    var polygonid;
    var extrudeheight = 10000;
    var polygonreference = [];

    polygon = [4, 0, 2];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[1], extrudeheight, polygonreference, results);

    polygon = [0, 2, 5];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[2], extrudeheight, polygonreference, results);


    polygon = [4, 2, 1];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[4], extrudeheight, polygonreference, results);

    polygon = [2, 1, 5];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[5], extrudeheight, polygonreference, results);


    polygon = [4, 1, 3];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[10], extrudeheight, polygonreference, results);

    polygon = [1, 3, 5];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[11], extrudeheight, polygonreference, results);


    polygon = [4, 3, 0];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[13], extrudeheight, polygonreference, results);

    polygon = [3, 5, 0];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    czml.createPolygon(polygonid, polygonid, polygonid, colors[14], extrudeheight, polygonreference, results);

    return results;
}
