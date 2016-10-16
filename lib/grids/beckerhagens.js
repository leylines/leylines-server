'use strict';

var geometry = require('../createGeometry');
var czml = require('../createCzml');

exports.level1 = function(data, results) {

    var line;
    var description;
    var linewidth = 300000.0;
    var colorvalue = [255,255,255];

    line = [28, 32, 31, 4, 34, 6, 29 , 33, 30, 5, 35, 7, 28];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	line = [8, 32, 11, 27, 37, 25, 9, 33, 10, 26, 36, 24, 8];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	line = [20, 35, 22, 1, 37, 3, 21, 34, 23, 0, 36, 2, 20];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	line = [31, 44, 27, 1, 55, 13, 30, 40, 26, 0, 54, 12, 31];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	line = [45, 14, 23, 46, 31, 11, 42, 17, 22, 47, 30, 10, 45];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	line = [24, 43, 28, 17, 58, 1, 25, 41, 29, 14, 61, 0, 24];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	line = [20, 51, 28, 11, 44, 19, 21, 49, 29, 10, 40, 15, 20];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	line = [24, 59, 20, 5, 47, 13, 25, 57, 21, 4, 46, 12, 24];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	line = [8, 28, 50, 22, 13, 39, 9, 29, 53, 23, 12, 38, 8];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	line = [8, 31, 52, 21, 16, 41, 9, 30, 48, 20, 18, 43, 8];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	line = [24, 38, 31, 19, 60, 3, 25, 39, 30, 15, 56, 2, 24];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	line = [27, 19, 52, 4, 23, 61, 26, 15, 48, 5, 22, 58, 27];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	line = [7, 22, 55, 25, 16, 49, 6, 23, 54, 24, 18, 51, 7];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	line = [14, 53, 6, 21, 60, 27, 17, 50, 7, 20, 56, 26, 14];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	line = [59, 18, 28, 42, 27, 3, 57, 16, 29, 45, 26, 2, 59];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

}

exports.area = function(colors,results) {

    var polygon = [];
    var polygonid;
    var extrudeheight = 10000;
    var polygonreference = [];

    polygon = [20, 51, 59];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[1], extrudeheight, polygonreference, results);

    polygon = [38, 43, 32];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[1], extrudeheight, polygonreference, results);

    polygon = [51, 43, 28];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[1], extrudeheight, polygonreference, results);

    polygon = [24, 43, 59];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[1], extrudeheight, polygonreference, results);

    polygon = [38, 31, 32];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[2], extrudeheight, polygonreference, results);

    polygon = [43, 32, 28];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[2], extrudeheight, polygonreference, results);

    polygon = [51, 43, 59];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[2], extrudeheight, polygonreference, results);

    polygon = [24, 38, 43];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[2], extrudeheight, polygonreference, results);


    polygon = [44, 42, 27];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[4], extrudeheight, polygonreference, results);

    polygon = [42, 50, 58];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[4], extrudeheight, polygonreference, results);

    polygon = [32, 28, 42];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[4], extrudeheight, polygonreference, results);

    polygon = [31, 32, 44];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[4], extrudeheight, polygonreference, results);

    polygon = [50, 58, 22];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[5], extrudeheight, polygonreference, results);

    polygon = [42, 27, 58];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[5], extrudeheight, polygonreference, results);

    polygon = [28, 42, 50];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[5], extrudeheight, polygonreference, results);

    polygon = [32, 44, 42];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[5], extrudeheight, polygonreference, results);


    polygon = [26, 61, 36];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[10], extrudeheight, polygonreference, results);

    polygon = [54, 46, 38];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[10], extrudeheight, polygonreference, results);

    polygon = [36, 54, 24];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[10], extrudeheight, polygonreference, results);

    polygon = [61, 23, 54];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[10], extrudeheight, polygonreference, results);

    polygon = [46, 38, 31];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[11], extrudeheight, polygonreference, results);

    polygon = [54, 24, 38];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[11], extrudeheight, polygonreference, results);

    polygon = [61, 36, 54];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[11], extrudeheight, polygonreference, results);

    polygon = [23, 54, 46];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[11], extrudeheight, polygonreference, results);


    polygon = [31, 46, 52];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[13], extrudeheight, polygonreference, results);

    polygon = [52, 34, 21];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[13], extrudeheight, polygonreference, results);

    polygon = [23, 34, 46];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[13], extrudeheight, polygonreference, results);

    polygon = [53, 34, 49];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[13], extrudeheight, polygonreference, results);

    polygon = [29, 53, 49];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[14], extrudeheight, polygonreference, results);

    polygon = [34, 46, 52];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[14], extrudeheight, polygonreference, results);

    polygon = [23, 53, 34];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[14], extrudeheight, polygonreference, results);

    polygon = [49, 34, 21];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[14], extrudeheight, polygonreference, results);


    polygon = [37, 25, 57];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[16], extrudeheight, polygonreference, results);

    polygon = [44, 52, 60];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[16], extrudeheight, polygonreference, results);

    polygon = [57, 21, 60];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[16], extrudeheight, polygonreference, results);

    polygon = [27, 60, 37];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[16], extrudeheight, polygonreference, results);

    polygon = [31, 44, 52];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[17], extrudeheight, polygonreference, results);

    polygon = [52, 60, 21];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[17], extrudeheight, polygonreference, results);

    polygon = [60, 37, 57];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[17], extrudeheight, polygonreference, results);

    polygon = [44, 27, 60];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[17], extrudeheight, polygonreference, results);


    polygon = [40, 48, 30];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[16], extrudeheight, polygonreference, results);

    polygon = [59, 36, 56];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[16], extrudeheight, polygonreference, results);

    polygon = [20, 48, 56];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[16], extrudeheight, polygonreference, results);

    polygon = [26, 40, 56];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[16], extrudeheight, polygonreference, results);

    polygon = [24, 36, 59];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[17], extrudeheight, polygonreference, results);

    polygon = [20, 59, 56];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[17], extrudeheight, polygonreference, results);

    polygon = [40, 48, 56];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[17], extrudeheight, polygonreference, results);

    polygon = [26, 36, 56];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[17], extrudeheight, polygonreference, results);


    polygon = [47, 48, 30];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[13], extrudeheight, polygonreference, results);

    polygon = [51, 50, 35];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[13], extrudeheight, polygonreference, results);

    polygon = [22, 47, 35];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[13], extrudeheight, polygonreference, results);

    polygon = [20, 48, 35];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[13], extrudeheight, polygonreference, results);

    polygon = [51, 50, 28];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[14], extrudeheight, polygonreference, results);

    polygon = [22, 50, 35];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[14], extrudeheight, polygonreference, results);

    polygon = [47, 48, 35];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[14], extrudeheight, polygonreference, results);

    polygon = [20, 51, 35];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[14], extrudeheight, polygonreference, results);


    polygon = [47, 39, 30];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[10], extrudeheight, polygonreference, results);

    polygon = [58, 37, 55];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[10], extrudeheight, polygonreference, results);

    polygon = [55, 25, 39];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[10], extrudeheight, polygonreference, results);

    polygon = [22, 55, 47];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[10], extrudeheight, polygonreference, results);

    polygon = [27, 58, 37];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[11], extrudeheight, polygonreference, results);

    polygon = [37, 55, 25];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[11], extrudeheight, polygonreference, results);

    polygon = [55, 47, 39];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[11], extrudeheight, polygonreference, results);

    polygon = [58, 22, 55];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[11], extrudeheight, polygonreference, results);


    polygon = [30, 33, 40];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[4], extrudeheight, polygonreference, results);

    polygon = [45, 53, 61];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[4], extrudeheight, polygonreference, results);

    polygon = [40, 45, 26];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[4], extrudeheight, polygonreference, results);

    polygon = [33, 29, 45];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[4], extrudeheight, polygonreference, results);

    polygon = [53, 61, 23];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[5], extrudeheight, polygonreference, results);

    polygon = [45, 26, 61];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[5], extrudeheight, polygonreference, results);

    polygon = [33, 40, 45];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[5], extrudeheight, polygonreference, results);

    polygon = [29, 45, 53];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[5], extrudeheight, polygonreference, results);


    polygon = [39, 30, 33];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[1], extrudeheight, polygonreference, results);

    polygon = [57, 41, 49];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[1], extrudeheight, polygonreference, results);

    polygon = [41, 33, 29];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[1], extrudeheight, polygonreference, results);

    polygon = [25, 39, 41];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[1], extrudeheight, polygonreference, results);

    polygon = [49, 57, 21];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[2], extrudeheight, polygonreference, results);

    polygon = [41, 29, 49];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[2], extrudeheight, polygonreference, results);

    polygon = [39, 41, 33];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[2], extrudeheight, polygonreference, results);

    polygon = [25, 57, 41];
    polygonreference = czml.createPolygonReference(polygon);
    polygonid = polygon.join("-");
    results = czml.createPolygon(polygonid, polygonid, polygonid, colors[2], extrudeheight, polygonreference, results);

    return results;
}
