'use strict';

exports.createFeatureInfo = function(row) {

	var utils = require('./utils');

	if (!row.description) {
		row.description = row.site;
	}
	var wikipedialink = "<a href=\"https://en.wikipedia.org/wiki/" + row.site.replace(/ /g, "_") + "\">" + row.site + "</a>";
	var image = "/popup/" + row.site.replace(/ /g, "_") + ".jpg";

	var description = "<!--HTML-->\r\n<p>\r\n";
	description += "<table>";
	if (utils.fileExists(image)) {
		description += "<tr><td colspan=\"2\"><img src=\"/images" +  image + "\" alt=\"" + row.site + "\" style=\"width:360px\"></td></tr>";
	}
	description += "<tr><td style=\"width: 360px; padding: 4px\" colspan=\"2\">" + row.description + "</td></tr>";
    if (row.object_type && row.object_type != "unknown") {
		description += "<tr><td style=\"width: 120px; padding: 4px\">Type:</td><td style=\"width: 240px\">" + row.object_type + "</td></tr>";
	}
	if (row.object_sub_type && row.object_sub_type != "unknown") {
		description += "<tr><td style=\"width: 120px; padding: 4px\">Subtype:</td><td style=\"width: 240px\">" + row.object_sub_type + "</td></tr>";
	}
	description += "<tr><td style=\"width: 120px; padding: 4px\">Wikipedia:</td><td style=\"width: 240px\">" + wikipedialink + "</td></tr>";
	if (row.data_owner) {
		description += "<tr><td style=\"width: 120px; padding: 4px\">Custodian:</td><td style=\"width: 240px\">" + row.data_owner + "</td></tr>";
	}
	if (row.links) {
		var links = "<a href=\"" + row.links + "\">" + row.links + "</a>";
		description += "<tr><td style=\"width: 120px; padding: 4px\">Links:</td><td style=\"width: 240px\">" + links + "</td></tr>";
	}
	if (row.country) {
		description += "<tr><td style=\"width: 120px; padding: 4px\">Country:</td><td style=\"width: 240px\">" + row.country + "</td></tr>";
	}
	description += "</table>";
	description += "\r\n</p>";

        return description;
};

