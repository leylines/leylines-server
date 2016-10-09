'use strict';

var geometry = require('../createGeometry');

exports.level1 = function(data, results) {

    var line;
    var description;
    var linewidth = 300000.0;
    var colorvalue = [255,255,255];

    line = [0, 2, 3, 0];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [0, 1, 2];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [1, 3];
    description  = line;
    geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

    return results;
}
