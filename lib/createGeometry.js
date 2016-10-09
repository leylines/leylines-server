'use strict';

exports.createPoints = function(data, icon, results) {

	var czml = require('./createCzml.js');

	for (var i=0, tot=data.length; i<tot; i++) {
        if (icon) {
    		var icon = "/images/button_yellow.svg";
    		var scale = 0.03;
        } else  {
    		var icon = "";
    		var scale = 1;
        }
		var pointvalues = data[i].split('|');
		results = czml.createPoint(pointvalues[0], pointvalues[3], pointvalues[3], icon, scale, Number(pointvalues[1]), Number(pointvalues[2]), 1000, results);
	}
	return results;
};

exports.createCorridor = function(data, line, description, linewidth, colorvalue, results) {

	var czml = require('./createCzml.js');
	//var lineid = line.join();

	for (var i=0, tot=line.length-1; i<tot; i++) {
		var referencesvalues = [];
		var pointvalues = data[line[i]].split('|');
		//var id = lineid + "," + pointvalues[0];
		var name = pointvalues[0];
		referencesvalues.push(Number(pointvalues[1]));
		referencesvalues.push(Number(pointvalues[2]));
		referencesvalues.push(Number(0));
		pointvalues = data[line[i+1]].split('|');
		//id += pointvalues[0];
		name += "-" + pointvalues[0];
		referencesvalues.push(Number(pointvalues[1]));
		referencesvalues.push(Number(pointvalues[2]));
		referencesvalues.push(Number(0));
		colorvalue[3] = 64;
		//console.log(colorvalue);
		results = czml.createCorridorCarto(name + "c", name, description, linewidth, colorvalue, referencesvalues, results);
		//colorvalue[3] = 255;
		//console.log(colorvalue);
		results = czml.createPolylineCarto(name + "p", name, description, 3, colorvalue, referencesvalues, results);
	}
};

