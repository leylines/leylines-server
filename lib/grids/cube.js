'use strict';

exports.level1 = function(data, results) {

    var line;
    var description;
    var linewidth = 300000.0;
    var colorvalue = [255,255,255];

    line = [0, 7, 5, 6, 0];
    description  = line;
    exports.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [6, 3, 2, 0];
    description  = line;
    exports.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [2, 4, 7];
    description  = line;
    exports.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [4, 1, 5];
    description  = line;
    exports.createCorridor(data, line, description, linewidth, colorvalue, results);

    line = [3, 1];
    description  = line;
    exports.createCorridor(data, line, description, linewidth, colorvalue, results);

    return results;
}
