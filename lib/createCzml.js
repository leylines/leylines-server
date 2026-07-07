"use strict";

import * as utils from "./utils.js";

export function createHeader() {
  return [{ id: "document", name: "simple", version: "1.0" }];
}

export function createPoint(
  packetArray,
  row,
  description,
  scale,
  iconUrl,
  pixeloffset = [0, 0]
) {
  const packet = {
    id: row.id,
    name: row.name || row.site,
    description: description
  };
  if (scale === 0.0) {
    const rgba = utils.hexAToRGBA(`${iconUrl}ff`);
    packet.point = {
      color: { rgba: [255, 255, 255, 255],},
      outlineColor: { rgba: rgba,},
      outlineWidth: 1,
      pixelSize: 7,
    };
      
  } else if (iconUrl) {
    packet.billboard = {
      eyeOffset: { cartesian: [0, 0, 0] },
      horizontalOrigin: "CENTER",
      image: iconUrl,
      heightReference: "CLAMP_TO_GROUND",
      pixelOffset: { cartesian2: pixeloffset },
      scale: scale, // Verwende den Parameter scale
      show: true,
      verticalOrigin: "CENTER"
    };
  }

  packet.position = {
    cartographicDegrees: [
      Number(row.x_coord),
      Number(row.y_coord),
      Number(row.z_coord) || null
    ]
  };

  packetArray.push(packet);
}

export function createPolyline(
  id,
  name,
  description,
  linewidth,
  colorvalue,
  referencesvalues,
  packetArray
) {
  const packet = {
    id: id,
    name: name,
    description: description,
    polyline: {
      width: linewidth,
      followSurface: true,
      clampToGround: true,
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
}

export function createCorridor(
  id,
  name,
  description,
  linewidth,
  colorvalue,
  referencesvalues,
  packetArray
) {
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

export async function createMultiline(
  linewidth,
  color,
  startpoint,
  endpoints,
  results
) {
  for (let i = 0, tot = endpoints.length; i < tot; i++) {
    const polylinereference = [];
    const polylineid = `${startpoint}${endpoints[i]}`;
    polylinereference.push(`${startpoint}#position`);
    polylinereference.push(`${endpoints[i]}#position`);
    results = exports.createPolyline(
      polylineid,
      polylineid,
      polylineid,
      linewidth,
      color,
      polylinereference,
      results
    );
  }
  return results;
}

export function createArrowCarto(
  id,
  name,
  description,
  linewidth,
  colorvalue,
  referencesvalues,
  packetArray
) {
  const packet = {
    id: id,
    name: name,
    description: description,
    polyline: {
      width: linewidth,
      followSurface: true,
      clampToGround: true,
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

export function createPolygon(
  id,
  name,
  description,
  colorvalue,
  outlinecolorvalue,
  extrudeheight,
  polygonPositions,
  results
) {
  const packet = {
    id: id,
    name: name,
    description: description,
    polygon: {
      fill: true,
      followSurface: true,
      material: {
        solidColor: {
          color: {
            rgba: colorvalue
          }
        }
      },
      outline: true,
      outlineColor: { rgba: outlinecolorvalue },
      positions: {
        cartographicDegrees: polygonPositions // Wichtig: Explizit angeben für Cesium
      },
      extrudedHeight: extrudeheight
    }
  };
  results.push(packet);
  return results;
}
