'use strict';

var geometry = require('../createGeometry');

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

