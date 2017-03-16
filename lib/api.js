"use strict";

var express = require('express');
var leylines = require('./leylines');

module.exports = function(options) {

  var pgConnectionString = options.pgConnectionString || [];

  // routes for postgis api
  var router = express.Router();    // get an instance of the express Router

  router.get('/points/:schema/:table/:type', function(req, res) {
      leylines.createPOI(req, res, pgConnectionString);
  });

  router.get('/sites/:schema/:table', function(req, res) {
      leylines.createSite(req, res, pgConnectionString);
  });

  router.get('/areas/:schema/:table/:name', function(req, res) {
      leylines.createArea(req, res, pgConnectionString);
  });

  router.get('/line/:schema/:table/:width/:color', function(req, res) {
      leylines.createLine(req, res, pgConnectionString);
  });

  router.get('/createGrid/:lat1/:lon1/:azi/:shape/:type', function(req, res) {
      leylines.createGrid(req, res, pgConnectionString);
  });

  router.get('/createCircle/:lat1/:lon1/:lat2/:lon2/:type', function(req, res) {
      leylines.createCircle(req, res, pgConnectionString);
  });

  router.get('/megalithic/:type', function(req, res) {
      leylines.createMegalithic(req, res, pgConnectionString);
  });

  return router;

};

