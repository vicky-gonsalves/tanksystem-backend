import http from 'http';
import api from './api';
import {apiRoot, env, ip, mongo, port, seedDB} from './config';
import express from './services/express';
import mongoose from './services/mongoose';

const app = express(apiRoot, api);
const server = http.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: env !== 'production',
  path: '/socket.io'
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
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
});

export default app;
