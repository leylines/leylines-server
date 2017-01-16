'use strict';

exports.pgFindPOI = function(connectionString, data, lines, czmlfile, callback) {

   var czml = require('./createCzml');
   var pg = require('pg');
   connectionString = "postgres://leylines:leylines@localhost:5555/leylines";
 
   pg.connect(connectionString, function(err, client) {

      client.query("CREATE TEMP TABLE temp_grid(gid serial primary key, geom geometry(MultiLinestringZ,4326))");

      var multilinestring = []; 
      for (var i=0, tot=lines.length; i<tot; i++) {
         var fpointvalues = data[lines[i][0]].split('|');
         var spointvalues = data[lines[i][1]].split('|');
         multilinestring.push("(" + Number(fpointvalues[1]) + " " + Number(fpointvalues[2]) + " 0.0, " + Number(spointvalues[1]) + " " + Number(spointvalues[2]) + " 0.0)");
      }
      var query = "INSERT INTO temp_grid(geom) VALUES (ST_GeomFromText('MultiLinestringZ(" +  multilinestring.join(",") + ")',4326))";
      client.query(query);

      var query = client.query("SELECT * FROM leylines.poi l INNER JOIN temp_grid g ON ST_DWithin(l.geom::geography, g.geom::geography, 10000);");
      var id = 1;
      query.on('row', function(row, result) {
         if (!row.description) {
            row.description = row.site;
         }
         var wikipedialink = "<a href=\"https://en.wikipedia.org/wiki/" + row.site.replace(/ /g, "_") + "\">" + row.site + "</a>";
         var links = "<a href=\"" + row.links + "\">" + row.links + "</a>";
         var icon = "/images/button_yellow.svg";
         var scale = 0.05;
         var description = "<!--HTML-->\r\n<p>\r\n";
         var image = "/popup/" + row.site.replace(/ /g, "_") + ".jpg";
         description += "<table>";
         if (exports.fileExists(image)) {
            description += "<tr><td colspan=\"2\"><img src=\"/images" +  image + "\" alt=\"" + row.site + "\" style=\"width:360px\"></td></tr>";
         }
         description += "<tr><td style=\"width: 360px; padding: 4px\" colspan=\"2\">" + row.description + "</td></tr>";
         description += "<tr><td style=\"width: 120px; padding: 4px\">Wikipedia:</td><td style=\"width: 240px\">" + wikipedialink + "</td></tr>";
         if (row.data_owner) {
            description += "<tr><td style=\"width: 120px; padding: 4px\">Custodian:</td><td style=\"width: 240px\">" + row.data_owner + "</td></tr>";
         }
         if (row.links) {
            description += "<tr><td style=\"width: 120px; padding: 4px\">Links:</td><td style=\"width: 240px\">" + links + "</td></tr>";
         }
         if (row.country) {
            description += "<tr><td style=\"width: 120px; padding: 4px\">Country:</td><td style=\"width: 240px\">" + row.country + "</td></tr>";
         }
         description += "</table>";
         description += "\r\n</p>";
         czmlfile = czml.createPoint(id, row.site, description, icon, scale, Number(row.x_coord), Number(row.y_coord), Number(row.z_coord), czmlfile);
         id++;
      });
      query.on('end', function () {
         callback(null, czmlfile);
         client.end();
      });
   })
};

exports.fileExists =  function(filename) {
    var fs = require('fs');
    var path = require('path');
    var dir =  path.resolve('wwwroot/images');
    var file = dir + filename;
    var isok;
    if (fs.existsSync(file)) {
        return 1;
    } else {
        return 0;
    }
};

