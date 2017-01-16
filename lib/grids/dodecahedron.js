'use strict';

var geometry = require('../createGeometry');
var czml = require('../createCzml');

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
