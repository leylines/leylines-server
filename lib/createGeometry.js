'use strict';

exports.createPoints = function(data, icon, results) {

   var czml = require('./createCzml.js');

   for (var i=0, tot=data.length; i<tot; i++) {
      if (icon) {
         var icon = "/images/button_yellow.png";
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

exports.createCorridor = function(connectionString, data, lines, distance, colorvalue, czmlfile) {

   return function (callback) {

      var czml = require('./createCzml');
      var linewidth = distance * 2;

      for (var i=0, tot=lines.length; i<tot; i++) {
        
         var referencesvalues = [];

         var pointvalues = data[lines[i][0]].split('|');
         var name = lines[i][0] + "-" + lines[i][1];
         referencesvalues.push(Number(pointvalues[1]));
         referencesvalues.push(Number(pointvalues[2]));
         referencesvalues.push(Number(0));

         pointvalues = data[lines[i][1]].split('|');
         referencesvalues.push(Number(pointvalues[1]));
         referencesvalues.push(Number(pointvalues[2]));
         referencesvalues.push(Number(0));

         colorvalue[3] = 64;
         czmlfile = czml.createCorridorCarto(name + "c", name, name, linewidth, colorvalue, referencesvalues, czmlfile);
         czmlfile = czml.createPolylineCarto(name + "p", name, name, 3, colorvalue, referencesvalues, czmlfile);
      }

      callback (null, connectionString, data, lines, distance, czmlfile);
   }
};

exports.createArea = function(polygons, czmlfile) {

   var czml = require('./createCzml');

   var polygonid;
   var extrudeheight = 10000;
   var polygonreference = [];
   for (var i=0, tot1=polygons.length; i<tot1; i++) {

      for (var j=0, tot2=polygons[i][0].length; j<tot2; j++) {

         polygonreference = czml.createPolygonReference(polygons[i][0][j]);
         polygonid = polygons[i][0][j].join("-");
         czmlfile = czml.createPolygon(polygonid, polygonid, polygonid, polygons[i][1], extrudeheight, polygonreference, czmlfile);

      }
   }

   return czmlfile;
}
