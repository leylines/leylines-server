'use strict';

var geometry = require('./createGeometry');
var beckerhagens = require('./grids/beckerhagens');
var cube = require('./grids/cube');
var dodecahedron = require('./grids/dodecahedron');
var icosahedron = require('./grids/icosahedron');
var tetrahedron = require('./grids/tetrahedron');
var octahedron = require('./grids/octahedron');
    
var colors = [
  [119, 17, 85], [170, 68, 136], [204, 153, 187],
  [17, 68, 119], [68, 119, 170], [119, 170, 221],
  [17, 119, 119], [68, 170, 170], [119, 204, 204],
  [17, 119, 68], [68, 170, 119], [136, 204, 170],
  [119, 119, 17], [170, 170, 68], [221, 221, 119],
  [119, 68, 17], [170, 119, 68], [221, 170, 119],
  [119, 17, 34], [170, 68, 85], [221, 119, 136]
]

for (var i = 0; i < colors.length; i++) {
  colors[i].push(64);
}

exports.createGrid = function(data, shape, level, results) {
    switch (shape) {
        case "beckerhagens":
            
            switch (level) {
                case "points":
                    geometry.createPoints(data,1,results);
                    return results;
                case "area":
                    geometry.createPoints(data,0,results);
                    beckerhagens.area(colors,results);
                    return results;
                case "1":
                    beckerhagens.level1(data,results);
                    return results;
                case "2":
                    beckerhagens.level2(data,results);
                    return results;
            } 

        case "cube":
            
            switch (level) {
                case "points":
                    geometry.createPoints(data,1,results);
                    return results;
                case "area":
                    geometry.createPoints(data,0,results);
                    cube.area(colors,results);
                    return results;
                case "1":
                    cube.level1(data,results);
                    return results;
                case "2":
                    cube.level2(data,results);
                    return results;
            } 

        case "dodecahedron":
            
            switch (level) {
                case "points":
                    geometry.createPoints(data,1,results);
                    return results;
                case "area":
                    geometry.createPoints(data,0,results);
                    dodecahedron.area(colors,results);
                    return results;
                case "1":
                    dodecahedron.level1(data,results);
                    return results;
                case "2":
                    dodecahedron.level2(data,results);
                    return results;
            } 

        case "icosahedron":
            
            switch (level) {
                case "points":
                    geometry.createPoints(data,1,results);
                    return results;
                case "area":
                    geometry.createPoints(data,0,results);
                    icosahedron.area(colors,results);
                    return results;
                case "1":
                    icosahedron.level1(data,results);
                    return results;
                case "2":
                    icosahedron.level2(data,results);
                    return results;
            } 


        case "tetrahedron":
            
            switch (level) {
                case "points":
                    geometry.createPoints(data,1,results);
                    return results;
                case "area":
                    geometry.createPoints(data,0,results);
                    tetrahedron.area(colors,results);
                    return results;
                case "1":
                    tetrahedron.level1(data,results);
                    return results;
            } 

        case "octahedron":
            
            switch (level) {
                case "points":
                    geometry.createPoints(data,1,results);
                    return results;
                case "area":
                    geometry.createPoints(data,0,results);
                    octahedron.area(colors,results);
                    return results;
                case "1":
                    octahedron.level1(data,results);
                    return results;
            } 

    }
}

exports.createLinesLevel1 = function(data, level, results) {

	var referencesvalues = [];
	var pointvalues = [];
	var line = [];
	var description;

	// Giza Cross

	var linewidth = 700000.0;
	var colorvalue = [255,255,255];

	description  = "Giza - Vatican -Carnac";
	line = [28, 32, 31, 4, 34, 6, 29 , 33, 30, 5, 35, 7, 28];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Giza - Gobekli Tepe";
	line = [8, 32, 11, 27, 37, 25, 9, 33, 10, 26, 36, 24, 8];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Giza";
	line = [20, 35, 22, 1, 37, 3, 21, 34, 23, 0, 36, 2, 20];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	var linewidth = 200000.0;

	description  = "Tibet - Hawaii";
	line = [28, 36, 29, 37, 28];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "";
	line = [54, 46, 52, 60, 37, 55, 47, 48, 56, 36, 54];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);


	var linewidth = 300000.0;
	var colorvalue = [255,128,0];

	description  = "Carnac - New Zealand";
	line = [31, 44, 27, 1, 55, 13, 30, 40, 26, 0, 54, 12, 31];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Mohenjo Daro - Lake Baikal";
	line = [59, 18, 28, 42, 27, 3, 57, 16, 29, 45, 26, 2, 59];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "";
	line = [24, 43, 28, 17, 58, 1, 25, 41, 29, 14, 61, 0, 24];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Carnac - Varanasi - Uluru";
	line = [45, 14, 23, 46, 31, 11, 42, 17, 22, 47, 30, 10, 45];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "";
	line = [7, 22, 55, 25, 16, 49, 6, 23, 54, 24, 18, 51, 7];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "South Pole - Mount Shasta - North Pole";
	line = [20, 51, 28, 11, 44, 19, 21, 49, 29, 10, 40, 15, 20];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Tiwanaku";
	line = [27, 19, 52, 4, 23, 61, 26, 15, 48, 5, 22, 58, 27];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Atlantis";
	line = [24, 59, 20, 5, 47, 13, 25, 57, 21, 4, 46, 12, 24];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	linewidth = 300000.0;
	colorvalue = [128,255,0];

	description  = "Giza - Mali - Fiji - Tibet";
	line = [38, 32, 42, 58, 55, 39, 33, 45, 61, 54, 38];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Giza - Ankara- Crimea - Hawaii";
	line = [43, 32, 44, 60, 57, 41, 33, 40, 56 ,59, 43];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Maya - New Delhi";
	line = [42, 44, 52, 34, 53, 45, 40, 48, 35, 50, 42];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Mu - Mali - Madagaskar - Atlantis";
	line = [43, 38, 46, 34, 49, 41, 39, 47, 35, 51, 43];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);


	// Switzerland

	colorvalue = [255,0,0];
	linewidth = 700000.0;

	description  = "Carnac - Switzerland - Gobekli Tepe";
	line = [31, 50, 30, 53, 31];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Carnac - Stonehenge - North Pole - Southpole - Mali";
	line = [24, 38, 31, 19, 60, 3, 25, 39, 30, 15, 56, 2, 24];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Cambodia - Japan";
	line = [59, 51, 50, 58, 37, 57, 49, 53, 61, 36, 59];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	linewidth = 200000.0;

	description  = "";
	line = [8, 28, 50, 22, 13, 39, 9, 29, 53, 23, 12, 38, 8];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Banff - Lake Baikal";
	line = [14, 53, 6, 21, 60, 27, 17, 50, 7, 20, 56, 26, 14];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Etna";
	line = [38, 27, 39, 26, 38];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Konga Pass";
	line = [53, 19, 50, 15, 53];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);


	colorvalue = [255,255,0];
	linewidth = 150000.0;

	description  = "Teotihuacan - Mount Shasta";
	line = [61, 3, 58, 7, 2, 61];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);
	
	description  = "Tiwanaku - Alaska - Cambodia";
	line = [61, 20, 58, 21, 61];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);


	colorvalue = [255,0,255];
	linewidth = 150000.0;

	description  = "";
	line = [61, 9, 58, 8, 61];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Tiwanaku";
	line = [61, 34, 60, 58, 35, 56, 61];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Carnac - Ireland";
	line = [8, 31, 52, 21, 16, 41, 9, 30, 48, 20, 18, 43, 8];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Externsteine";
	line = [61, 31, 58, 30, 61];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);


	colorvalue = [0,128,255];
	linewidth = 150000.0;

	description  = "Konga Pass";
	line = [45, 24, 42, 25, 45];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	return results;


	colorvalue = [0,0,255];
	linewidth = 100000.0;

	description  = "Omsk - Madagaskar";
	line = [28, 60, 29, 56, 28];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);

	description  = "Hawaii";
	line = [41, 19, 43 ,15, 41];
	geometry.createCorridor(data, line, description, linewidth, colorvalue, results);


};

exports.rotateZ = function(param, thetaZ) {
	var i, tot;
	for (i=0, tot=param.length; i<tot; i++) {
	        var x = param[i][0];
	        var y = param[i][1];
	        var z = param[i][2];

	        param[i][0] = x*Math.cos(thetaZ)-y*Math.sin(thetaZ);
	        param[i][1] = x*Math.sin(thetaZ)+y*Math.cos(thetaZ);
	        param[i][2] = z;
	}
	return param;
};

exports.rotateX = function(param, thetaX) {
	var i, tot;
	for (i=0, tot=param.length; i<tot; i++) {
	        var x = param[i][0];
	        var y = param[i][1];
	        var z = param[i][2];

		param[i][0] = x;
		param[i][1] = y*Math.cos(thetaX)-z*Math.sin(thetaX);
		param[i][2] = y*Math.sin(thetaX)+z*Math.cos(thetaX);
	}
	return param;
};

exports.rotateY = function(param, thetaY) {
	var i, tot;
	for (i=0, tot=param.length; i<tot; i++) {
	        var x = param[i][0];
	        var y = param[i][1];
	        var z = param[i][2];

		param[i][0] = x*Math.cos(thetaY)+z*Math.sin(thetaY);
		param[i][1] = y;
		param[i][2] = -x*Math.sin(thetaY)+z*Math.cos(thetaY);
	}
	return param;
};

//exports.bearing = function(lat1,lon1,lat2,lon2,thetaY) {
exports.bearing = function(lat1,lon1,lat2,lon2) {

	var math = require('./Math.js');

	lat1 = math.radians(lat1);
	lon1 = math.radians(lon1);
	lat2 = math.radians(lat2);
	lon2 = math.radians(lon2);

	var thetaY = math.radians(31.717474);

	var y = Math.sin(lon2-lon1)*Math.cos(lat2);
	var x = Math.cos(lat1)*Math.sin(lat2)-Math.sin(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1);

	if (y>0) {
		if (x>0) {
			thetaY = Math.atan(y/x);
		} else if (x<0) {
			thetaY = -Math.PI-Math.atan(-y/x);
		} else {
			thetaY = Math.PI/2;
		}
	} else if (y<0) {
		if (x>0) {
			thetaY = -Math.atan(-y/x);
		} else if (x<0) {
			thetaY = Math.atan(y/x)+Math.PI;
		} else {
			thetaY = Math.PI*3/2;
		}
	} else {
		if (x>0) {
			thetaY = 0;
		} else if (x<0) {
			thetaY = -Math.PI;
		} else {
			thetaY = 0;
		}
	}
	//return thetaY

        var bearing = Math.atan2( Math.sin(lon2-lon1) * Math.cos(lat2), Math.cos(lat1)*Math.sin(lat2)-Math.sin(lat1)*Math.cos(lat2)*Math.cos(lon2-lon1));
        return -bearing;

};

exports.coordinates = function(param, results) {

	var math = require('./Math.js');
	var i, tot;

	for (i=0, tot=param.length; i<tot; i++) {
	        var x = param[i][0];
	        var y = param[i][1];
	        var z = param[i][2];

		var theta = 0;
		var phi = 0;
		if (z < 0) {
			theta = Math.PI+Math.atan(Math.sqrt(x*x+y*y)/z);
		} else if (z===0) {
			theta = Math.Pi/2;
		} else {
			theta = Math.atan(Math.sqrt(x*x+y*y)/z);
		}

		if (x < 0 && y !== 0) {
			phi=Math.PI+Math.atan(y/x);
		} else if (x === 0 && y > 0) {
			phi=Math.PI/2;
		} else if (x === 0 && y < 0) {
			phi=Math.PI*3/2;
		} else if (y === 0 && x > 0) {
			phi=0;
		} else if (y === 0 && x < 0) {
			phi=Math.PI;	
		} else if (x > 0 && y <= 0) {
			phi = 2*Math.PI+Math.atan(y/x);
		} else if (x === 0 && y === 0)  {
			phi = 888;
		} else {
			phi=Math.atan(y/x);
		}

		param[i][0] = theta;
		param[i][1] = phi;
		delete param[i][2];

		theta = math.degrees(theta);
		phi = math.degrees(phi);
		var longitude;

		var latitude = 90-theta;
		if (phi <= 180) {
			longitude = phi;
		} else {
			longitude = phi-360;
		}

		if (longitude > 600) {
			longitude = 0.0;
		}

		results.push(i + "|" + longitude + "|" + latitude + "|" + i);
	}
	return results;
};

exports.getShapePoints = function(shapename) {

	var shapepoints = {};

	var p = (1+Math.sqrt(5))/2;

	shapepoints.dodecahedron = [[0,1/p,p],[0,-1/p,-p],[0,-1/p,p],[0,1/p,-p],[1/p,p,0],[-1/p,-p,0],[-1/p,p,0],[1/p,-p,0],[p,0,1/p],[-p,0,-1/p],[-p,0,1/p],[p,0,-1/p],[1,1,1],[-1,-1,-1],[-1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1],[1,-1,1],[1,1,-1]];
	shapepoints.icosahedron = [[0,1,p],[0,-1,-p],[0,-1,p],[0,1,-p],[1,p,0],[-1,-p,0],[-1,p,0],[1,-p,0],[p,0,1],[-p,0,-1],[-p,0,1],[p,0,-1]];
	shapepoints.cube = [[1,1,1],[-1,-1,-1],[-1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1],[1,-1,1],[1,1,-1]];
	shapepoints.tetrahedron = [[1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1]];
	shapepoints.octahedron = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
	shapepoints.beckerhagens = [[0,1/p,p],[0,-1/p,-p],[0,-1/p,p],[0,1/p,-p],[1/p,p,0],[-1/p,-p,0],[-1/p,p,0],[1/p,-p,0],[p,0,1/p],[-p,0,-1/p],[-p,0,1/p],[p,0,-1/p],[1,1,1],[-1,-1,-1],[-1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1],[1,-1,1],[1,1,-1],[0,-p,1],[0,p,-1],[0,-p,-1],[0,p,1],[1,0,p],[-1,0,-p],[-1,0,p],[1,0,-p],[p,-1,0],[-p,1,0],[-p,-1,0],[p,1,0],[2,0,0],[-2,0,0],[0,2,0],[0,-2,0],[0,0,2],[0,0,-2],[p,1/p,1],[-p,-1/p,-1],[-p,-1/p,1],[-p,1/p,-1],[p,-1/p,-1],[p,-1/p,1],[p,1/p,-1],[-p,1/p,1],[1,p,1/p],[-1,-p,-1/p],[-1,-p,1/p],[-1,p,-1/p],[1,-p,-1/p],[1,-p,1/p],[1,p,-1/p],[-1,p,1/p],[1/p,1,p],[-1/p,-1,-p],[-1/p,-1,p],[-1/p,1,-p],[1/p,-1,-p],[1/p,-1,p],[1/p,1,-p],[-1/p,1,p]];

	var shape = shapepoints[shapename];
	//console.log(shape);
	return shape;
};

//exports.calculateGridPoints = function(lat1, lon1, lat2, lon2, shapename, type) {
exports.calculateGridPoints = function(lat1, lon1, azi, shapename, type) {

	var math = require('./Math.js');
	var results = [];

	var thetaX;
	var thetaY;
	var thetaZ;

	// get shape
	var shape = exports.getShapePoints(shapename);

	// default the vertex of a shape toward true north
	thetaY = math.radians(20.9051574479);
	thetaX = math.radians(180);

	if (shapename == "dodecahedron") {
		shape = exports.rotateX(exports.rotateY(shape, thetaY), thetaX);
	}
	
	if (shapename == "beckerhagens") {
		shape = exports.rotateX(exports.rotateY(shape, thetaY), thetaX);
	}

	thetaY = math.radians(35.26439);
	thetaZ = math.radians(-45);
	thetaX = math.radians(180);

	if (shapename == "tetrahedron") {
		shape = exports.rotateY(exports.rotateZ(shape, thetaZ), thetaY);
	}

	if (shapename == "cube") {
		shape = exports.rotateX(exports.rotateY(exports.rotateZ(shape, thetaZ), thetaY), thetaX);
	}

	thetaY = math.radians(31.717474);

	if (shapename == "icosahedron") {
		shape = exports.rotateX(exports.rotateY(shape, thetaY), thetaX);
	}

	// set rotational angles
	//console.log(-math.degrees(azi));
	thetaX = azi; 
	thetaZ = math.radians(lon1);
	thetaY = -math.radians(lat1);

	results = exports.coordinates(exports.rotateZ(exports.rotateY(exports.rotateX(shape, thetaX), thetaY), thetaZ), results);
	return results;

};

exports.calculateGridLines = function(param, level) {

	var results = [];

	var x = 0;
	var z = 1;
	var smallest = 91;

	while (x < param.length) {
		while (z < param.length) {
			var xcoord = param[x].split("|"); 
			var zcoord = param[z].split("|"); 
			x = xcoord[0];
			z = zcoord[0];
			var a = xcoord[1];
			var b = xcoord[2];
			var c = zcoord[1];
			var d = zcoord[2];
			var separation = Math.acos(Math.sin(b*0.01744)*Math.sin(d*0.01744)+Math.cos(b*0.01744)*Math.cos(d*0.01744)*Math.cos(a*0.01744-c*0.01744))/0.01744;
			if (separation < 50 && level == 1) {
				results.push(x + "|" + z + "|" + a + "|" + b + "|" + c + "|" + d + "|" + separation);
			} else if (separation >= 50 && separation < 61 && level == 2) {
				results.push(x + "|" + z + "|" + a + "|" + b + "|" + c + "|" + d + "|" + separation);
			} else if (separation >= 61 && separation < 64 && level == 3) {
				results.push(x + "|" + z + "|" + a + "|" + b + "|" + c + "|" + d + "|" + separation);
			} else if (separation < smallest && level == 4) {
				results.push(x + "|" + z + "|" + a + "|" + b + "|" + c + "|" + d + "|" + separation);
			}
			z++;
		}
		z = Number(x) + 2;
		x++;
	}

	return results;
};
