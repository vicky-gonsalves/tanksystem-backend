import http from 'http';
import https from 'https';
import api from './api';
import {apiRoot, env, ip, mongo, port, secureport, seedDB} from './config';
import express from './services/express';
import mongoose from './services/mongoose';

const fs = require('fs');

const ssl_options = {
  key: fs.readFileSync('./src/keys/private.key'),
  cert: fs.readFileSync('./src/keys/cert.crt'),
  ca: fs.readFileSync('./src/keys/intermediate.crt')
};

const app = express(apiRoot, api);
const server = http.createServer(app);
let secureServer;

if (env === 'production') {
  secureServer = https.createServer(ssl_options, app);
}

var socketio = require('socket.io')(server, {
  serveClient: env !== 'production',
  path: '/socket.io-client'
});
require('./socketio').default(socketio);

socketio.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

mongoose.connect(mongo.uri, {useMongoClient: true});
mongoose.Promise = Promise;

// Populate databases with sample data
if (seedDB) {
  require('./seed');
}

setImmediate(() => {
  if (env === 'production') {
    secureServer.listen(secureport, ip, () => {
      console.log('Express server listening on https://%s:%d, in %s mode', ip, secureport, env);
    })
  } else {
    server.listen(port, ip, () => {
      console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env);
    })
  }
});

export default app;
