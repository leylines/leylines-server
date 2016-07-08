/* jshint node: true */
"use strict";

var express = require('express');
var compression = require('compression');
var path = require('path');
var cors = require('cors');
var cluster = require('cluster');
var fs = require('fs');
var exists = require('./exists');
var options = require('./options');
var basicAuth = require('basic-auth');

var api = require('./api');

function portInUse(port, host, callback) {
    var server = require('net').createServer();

    server.listen(port, host);
    server.on('error', function () {
        callback(true);
    });
    server.on('listening', function () {
        server.close();
        callback(false);
    });
}

function error(message) {
    console.error('Error: ' + message);
    process.exit(1);
}

function warn(message) {
    console.warn('Warning: ' + message);
}

function log(message, worker1only) {
    if (!worker1only || cluster.isWorker && cluster.worker.id === 1) {
        console.log(message);
    }
}

function endpoint(path, router) {
    if (options.verbose) {
        log('http://' + options.hostName + ':' + options.port + '/api/v1' + path, true);
    }
    if (path !== 'proxyabledomains') {
        // deprecated endpoint that isn't part of V1
        app.use('/api/v1' + path, router);
    }
    // deprecated endpoint at `/`
    app.use(path, router);
}


function runMaster() {
    function handleExit() {
        console.log('(TerriaJS-Server exiting.)');
        if (fs.existsSync('terriajs.pid')) {
            fs.unlinkSync('terriajs.pid');
        }
        process.exit(0);
    }


    var cpuCount = require('os').cpus().length;
    // Let's equate non-public, localhost mode with "single-cpu, don't restart".
    if (options.listenHost === 'localhost') {
        cpuCount = 1;
    }
    console.log('Serving directory "' + options.wwwroot + '" on port ' + options.port + ' to ' + (options.listenHost ? options.listenHost: 'the world') + '.');
    require('./controllers/convert')().testGdal();

    if (!exists(options.wwwroot)) {
        warn('"' + options.wwwroot + '" does not exist.');
    } else if (!exists(options.wwwroot + '/index.html')) {
        warn('"' + options.wwwroot + '" is not a TerriaJS wwwroot directory.');
    } else if (!exists(options.wwwroot + '/build')) {
        warn('"' + options.wwwroot + '" has not been built. You should do this:\n\n' +
            '> cd ' + options.wwwroot + '/..\n' +
            '> gulp\n');
    }

    if (typeof options.settings.allowProxyFor === 'undefined') {
        warn('The configuration does not contain a "allowProxyFor" list.  The server will proxy _any_ request.');
    }

    process.on('SIGTERM', handleExit);

    // Listen for dying workers
    cluster.on('exit', function (worker) {
        if (!worker.suicide) {
            // Replace the dead worker if not a startup error like port in use.
            if (options.listenHost === 'localhost') {
                console.log('Worker ' + worker.id + ' died. Not replacing it as we\'re running in non-public mode.');    
            } else {
                console.log('Worker ' + worker.id + ' died. Replacing it.');
                cluster.fork();
            }
        }
    });

    fs.writeFileSync('terriajs.pid', process.pid.toString());
    console.log('(TerriaJS-Server running with pid ' + process.pid + ')');

    console.log('Launching ' +  cpuCount + ' worker processes.');

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
}

if (cluster.isMaster) {
    // The master process just spins up a few workers and quits.
    console.log ('TerriaJS Server ' + require('../package.json').version);
    options.init();

    portInUse(options.port, options.listenHost, function (inUse) {
        if (inUse) {
            error('Port ' + options.port + ' is in use. Exiting.');
        } else {
            runMaster();
        }       
    });
    return;
}

options.init(true);

// Postgres-Settings
var pgUser = options.settings.pgUser
var pgPass = options.settings.pgPass
var pgHost = options.settings.pgHost
var pgPort = options.settings.pgPort
var pgDatabase = options.settings.pgDatabase
var pgConnectionString = 'postgres://' + pgUser + ':' + pgPass + '@' + pgHost + ':' + pgPort + '/' + pgDatabase;

// eventually this mime type configuration will need to change
// https://github.com/visionmedia/send/commit/d2cb54658ce65948b0ed6e5fb5de69d022bef941
var mime = express.static.mime;
mime.define({
    'application/json' : ['czml', 'json', 'geojson'],
    'text/plain' : ['glsl']
});

// initialise app with standard middlewares
var app = express();
app.use(compression());
app.use(cors());
app.disable('etag');
if (options.verbose) {
    app.use(require('morgan')('dev'));
}

if (typeof options.settings.trustProxy !== 'undefined') {
    app.set('trust proxy', options.settings.trustProxy);
}

if (options.verbose) {
    log('Listening on these endpoints:', true);
}
endpoint('/ping', function(req, res){
  res.status(200).send('OK');
});

// leylines api services
app.use('/api', require('./api')({
    pgConnectionString: pgConnectionString,
})); 

// We do this after the /ping service above so that ping can be used unauthenticated for health checks.

var auth = options.settings.basicAuthentication;
if (auth && auth.username && auth.password) {
    app.use(function(req, res, next) {
        var user = basicAuth(req);
        if (user && user.name === auth.username && user.pass === auth.password) {
            next();
        } else {
            res.statusCode = 401;
            res.setHeader('WWW-Authenticate', 'Basic realm="terriajs-server"');
            res.end('Unauthorized');
        }
    });
}

// Serve the bulk of our application as a static web directory.
var serveWwwRoot = exists(options.wwwroot + '/index.html');
if (serveWwwRoot) {
    app.use(express.static(options.wwwroot));
}

// Proxy for servers that don't support CORS
var bypassUpstreamProxyHostsMap = (options.settings.bypassUpstreamProxyHosts || []).reduce(function(map, host) {
        if (host !== '') {
            map[host.toLowerCase()] = true;
        }
        return map;
    }, {});

endpoint('/proxy', require('./controllers/proxy')({
    proxyableDomains: options.settings.allowProxyFor,
    proxyAllDomains: options.settings.proxyAllDomains,
    proxyAuth: options.proxyAuth,
    upstreamProxy: options.settings.upstreamProxy,
    bypassUpstreamProxyHosts: bypassUpstreamProxyHostsMap,
    basicAuthentication: options.settings.basicAuthentication
}));

endpoint('/proj4def', require('./controllers/proj4lookup'));            // Proj4def lookup service, to avoid downloading all definitions into the client.
endpoint('/convert', require('./controllers/convert')(options).router); // OGR2OGR wrapper to allow supporting file types like Shapefile.
endpoint('/proxyabledomains', require('./controllers/proxydomains')({   // Returns JSON list of domains we're willing to proxy for
    proxyableDomains: options.settings.allowProxyFor,
    proxyAllDomains: !!options.settings.proxyAllDomains,
}));
endpoint('/serverconfig', require('./controllers/serverconfig')(options));

var errorPage = require('./errorpage');
var show404 = serveWwwRoot && exists(options.wwwroot + '/404.html');
var error404 = errorPage.error404(show404, options.wwwroot, serveWwwRoot);
var show500 = serveWwwRoot && exists(options.wwwroot + '/500.html');
var error500 = errorPage.error500(show500, options.wwwroot);
var initPaths = options.settings.initPaths || [];

if (serveWwwRoot) {
    initPaths.push(path.join(options.wwwroot, 'init'));
}

app.use('/init', require('./controllers/initfile')(initPaths, error404, path.dirname(options.configFile)));
/*
// For testing, simply reflects stuff back at the caller. Uncomment if needed.
app.get('/reflect', function(req, res){
    res.status(200).send(req.headers);
});
var bodyParser = require('body-parser');
app.post('/reflect', bodyParser.urlencoded({extended: true, type: function() { return true; }}), function(req, res) {
    var response = {
        body: req.body,
        headers: req.headers
    };

    res.status(200).send(response);
});
*/

var feedbackService = require('./controllers/feedback')(options.settings.feedback);
if (feedbackService) {
    endpoint('/feedback', feedbackService);
}
var shareService = require('./controllers/share')(options.settings.shareUrlPrefixes, options.settings.newShareUrlPrefix, options.hostName, options.port);
if (shareService) {
    endpoint('/share', shareService);
}


app.use(error404);
app.use(error500);

app.listen(options.port, options.listenHost);
process.on('uncaughtException', function(err) {
    error(err.stack ? err.stack : err);
});

/*
//sample simple NM service. To use, uncomment and move above the fallback redirection.
app.post('/nm_service_1', function(req, res, next) {
    var formidable = require('formidable');
    //receive the posted object
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        //create a layer for NM to display
        var obj = {
            name: 'Bikes Available',
            type: 'DATA',
            proxy: false,
            url: 'http://nationalmap.nicta.com.au/test/bike_racks.geojson'
        };
        //send a response with the object and display text
        res.json({ displayHtml: 'Here are the available bike racks.', layer: obj});
    });
});
*/

