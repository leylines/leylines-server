"use strict";

import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import * as leylines from './leylines.js';

const router = express.Router();

const redirectToSurvey = (req, res) => {
  res.redirect(301, "https://survey123.arcgis.com/share/6313e1587ec34892a4ea0b4dd03ef1c7?portalUrl=https://uzh.maps.arcgis.com");
};

const allowedSchemas = ['alesia', 'history', 'megalithic', 'ramar', 'leylines', 'unesco', 'interfaithmary', 'starcities', 'sacredsites'];

const validateParams = (req, res, next) => {
  const { schema } = req.params;
  if (schema && !allowedSchemas.includes(schema)) {
    return res.status(403).json({ error: 'Ungültiges Schema' });
  }
  next();
};

export default function initRoutes({ pgUser, pgPass, pgHost, pgPort, pgDatabase }) {
  // 1. Pool-Konfiguration mit Shorthand-Properties
  const pool = new Pool({
    host: pgHost,
    user: pgUser,
    password: pgPass,
    database: pgDatabase,
  });

  // Pool-Fehler loggen (wichtig!)
  pool.on('error', (err) => {
    console.error('Unexpected error on idle pool-client', err);
  });

  // 2. Verbesserter Handler mit besserem Error-Handling
  const createHandler = (method, cacheTime = 3600) => async (req, res, next) => {
    try {
      if (cacheTime > 0) {
        res.set('Cache-Control', `public, max-age=${cacheTime}`);
      } else {
        res.set('Cache-Control', 'no-store'); // Gar kein Cache für dynamische Dinge
      }
      await method(req, res, pool);
    } catch (error) {
      console.error(`Error in ${method.name || 'anonymous function'}:`, error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  };

  // 3. Routen-Definitionen (Scannbar & Sauber)
  const routes = [
    ['get', '/poi/:schema/:table/:filterField/:type', leylines.createPointLayer],
    // http://localhost:3001/api/poi/leylines/view_poi/type/Pyramid
    ['get', '/alesia/:schema/:table/:image', leylines.createPointLayer],
    // http://localhost:3001/api/alesia/alesia/sites/star_255-255-66
    ['get', '/interfaithMary/:schema/:table/:image', leylines.createPointLayer],
    // http://localhost:3001/api/interfaithMary/interfaithmary/sites/button_yellow
    ['get', '/megalithic/:schema/:table/:filterField/:type', leylines.createPointLayer],
    // http://localhost:3001/api/megalithic/megalithic/sites/type_id/23
    ['get', '/ramar/:schema/:table/:filterField/:type', leylines.createPointLayer],
    // http://localhost:3001/api/ramar/ramar/poi/object_type/UFO
    ['get', '/sacredSites/:schema/:table/:image', leylines.createPointLayer],
    // http://localhost:3001/api/sacredSites/sacredsites/sites/button_cyan
    ['get', '/starCities/:schema/:table/:filterField/:type/:image', leylines.createPointLayer],
    // http://localhost:3001/api/starCities/starcities/sites/group/positive/green_button
    ['get', '/unesco/:schema/:table/:filterField/:type/:image', leylines.createPointLayer],
    // http://localhost:3001/api/unesco/unesco/sites/category/Natural/green_button
    ['get', '/exportPoints/:schema/:table/:type', leylines.exportPOI],
    ['get', '/areas/:schema/:table/:name', leylines.createArea],
    ['get', '/line/:schema/:table/:group/:width/:color{/:type}', leylines.createLine],
    ['get', '/delaunay/:schema/:table/:width/:color{/:group}', leylines.createDelaunay],
    ['get', '/voronoi/:schema/:table/:width/:color{/:group}', leylines.createVoronoi],
    ['get', '/exportLine/:schema/:table/:group/:width/:color{/:type}', leylines.exportLine],
    ['get', '/arrow/:schema/:table/:group/:width/:color', leylines.createArrow],
    ['get', '/createGrid/:latitude/:longitude/:bearing/:form/:category/:solid/:type{/:pois}', leylines.createGrid],
    ['get', '/exportGrid/:latitude/:longitude/:bearing/:form/:category/:solid/:type', leylines.exportGrid],
    ['get', '/createCircle/:lat1/:lon1/:lat2/:lon2/:type', leylines.createCircle],
    ['get', '/new-point', redirectToSurvey],
    ['get', '/new-line', redirectToSurvey],
  ];

    //['get', '/cifex/:type', leylines.createCifex],
    //['get', '/related/:schema/:table', leylines.createRelated],
    //['get', '/sites/:schema/:table', leylines.createSite],
    //['get', '/points/:schema/:table/:type', leylines.createPOI],


  routes.forEach(([verb, path, handler]) => {
    router[verb](path, validateParams, createHandler(handler));
  });

  return router;
}

