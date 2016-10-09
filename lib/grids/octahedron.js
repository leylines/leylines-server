'use strict';

var geometry = require('../createGeometry');

exports.level1 = function(data, results) {

    var line;
    var description;
    var linewidth = 300000.0;
    var colorvalue = [255,255,255];

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

