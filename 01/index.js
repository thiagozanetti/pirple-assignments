/*
 * 
 * Pirple homework assignment #01
 * 
 * The objective is to create a simple RESTFul service with only the hello route.
 * 
 */

// dependencies
const http = require('http');
const https = require('https');
const fs = require('fs');

// app modules
const config = require('./config');
const server = require('./server');

// Creates the HTTP server
const httpServer = http.createServer(server.serve);

// Creates the HTTPS server
const httpsOptions = {
  key: fs.readFileSync('./credentials/key.pem'),
  cert: fs.readFileSync('./credentials/cert.pem'),
}

const httpsServer = https.createServer(httpsOptions, server.serve)

// Instantiate servers
httpServer.listen(config.httpPort, () => console.log(`Listening on ${config.httpPort}`));
httpsServer.listen(config.httpsPort, () => console.log(`Listening on ${config.httpsPort}`));
