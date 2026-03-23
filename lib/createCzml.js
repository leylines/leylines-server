'use strict';

export function createHeader() {
   return [{"id": "document", "name": "simple", "version": "1.0"}];
};

export function createPoint(packetArray, row, description, scale, iconUrl, pixeloffset = [0, 0]) {

  const packet = {
    id: row.id,
    name: row.name || row.site,
    description: description,
  };

  if (iconUrl) {
    packet.billboard = {
      eyeOffset: { cartesian: [0, 0, 0] },
      horizontalOrigin: "CENTER",
      image: iconUrl,
      heightReference: "CLAMP_TO_GROUND",
      pixelOffset: { cartesian2: [0, 0] },
      scale: scale, // Verwende den Parameter scale
      show: true,
      verticalOrigin: "CENTER",
    };
  }
  
  packet.position = {
    cartographicDegrees: [
      Number(row.x_coord), 
      Number(row.y_coord), 
      Number(row.z_coord) || 0.0
    ],
  }

  packetArray.push(packet);
};

export function createPolyline(id, name, description, linewith, colorvalue, referencesvalues, packetArray) {
  const packet = {
    id: id,
    name: name,
    description: description,
    polyline: {
      width: linewith,
      followSurface: true,
      material: {
        polylineGlow: {
          glowPower: 0.2,
          color: { rgba: colorvalue }
        }
      },
      positions: {
        cartographicDegrees: referencesvalues
      }
    }
  };
  packetArray.push(packet);
};

export function createCorridor(id, name, description, linewidth, colorvalue, referencesvalues, packetArray) {
  const packet = {
    id: id,
    name: name,
    description: description,
    corridor: {
      width: linewidth,
      height: 0,
      material: {
        solidColor: {
          color: { rgba: colorvalue }
        }
      },
      outline: false,
      positions: {
        cartographicDegrees: referencesvalues
      }
    }
  };
  packetArray.push(packet);
}

export async function createMultiline(linewidth, color, startpoint, endpoints, results) {
	for (var i=0, tot=endpoints.length; i<tot; i++) {
		var polylinereference = [];
		var polylineid = startpoint + "" + endpoints[i];
		polylinereference.push(startpoint + "#position");
		polylinereference.push(endpoints[i] + "#position");
		results = exports.createPolyline(polylineid, polylineid, polylineid, linewidth, color, polylinereference, results);
	}
	return results;
};

export function createArrowCarto(id, name, description, linewidth, colorvalue, referencesvalues, packetArray) {
  const packet = {
    id: id,
    name: name,
    description: description,
    polyline: {
      width: linewidth,
      followSurface: true, // Wichtig für deine Michaels-Linie!
      material: {
        polylineArrow: {
          color: { rgba: colorvalue }
        }
      },
      positions: {
        cartographicDegrees: referencesvalues
      }
    }
  };
  
  packetArray.push(packet);
}

export async function createPolygonReference(referencesvalues) {
	var result = [];
	for (var j=0, tot=referencesvalues.length; j<tot; j++) {
		result.push(referencesvalues[j] + "#position");
	}
	return result;
};

export async function createPolygon(id, name, description, colorvalue, extrudeheight, referencesvalues, results) {
	var line = {};
	line.id = id;
	line.name = name;
	line.description = description;
	var polygon = {};
	polygon.followSurface = true;
	var rgba = {};
	rgba.rgba = colorvalue;
	var solidColor = {};
	solidColor.color = rgba;
	var material = {};
	material.solidColor = solidColor;
	polygon.material = material;
	var references = {};
	references.references = referencesvalues;
	polygon.positions = references;
	polygon.fill = true;
	polygon.extrudedHeight = extrudeheight;
	//polygon["outline"] = true;
	//polygon["outlineColor"] = rgba;
	line.polygon = polygon;
	results.push(line);
	return results;
};

export async function createPolygonCarto(id, name, description, colorvalue, extrudeheight, referencesvalues, results) {
	var line = {};
	line.id = id;
	line.name = name;
	line.description = description;
	var polygon = {};
	polygon.followSurface = true;
	var rgba = {};
	rgba.rgba = colorvalue;
	var solidColor = {};
	solidColor.color = rgba;
	var material = {};
	material.solidColor = solidColor;
	polygon.material = material;
	var carto = {};
	carto.cartographicDegrees = referencesvalues;
	polygon.positions = carto;
	polygon.fill = true;
	polygon.extrudedHeight = extrudeheight;
	line.polygon = polygon;
	results.push(line);
	return results;
};
