import http from 'http';
import api from './api';
import {initializeStatus, updateStatus} from './api/get-status/controller';
import {initializeLightStatus, updateLightStatus} from './api/light/controller';
import {apiRoot, env, ip, mongo, port, seedDB} from './config';
import express from './services/express';
import mongoose from './services/mongoose';

const app = express(apiRoot, api);
const server = http.createServer(app);
const webpush = require('web-push');
const PUBLIC_VAPID =
  'BEJp0Car3wMy9KIBpAwZYJXvmtDynRAUO5FH21f-kD2KDdszayFkoQH7vavJcPmKr_3qO_QSp6mO1AsUi2XavkQ';
const PRIVATE_VAPID = 'JlsW9KFdH2zgDnC6FiRwb4OFm3vzqHY5BvHuBt5TLvE';

const socketio = require('socket.io')(server, {
  serveClient: env !== 'production',
  path: '/socket.io'
});
require('./socketio').default(socketio);

let tankSystemId;
let lightSystemId;

socketio.on('connection', (socket) => {
  console.log("Connected");
  socket.emit('welcome', {message: 'Connected !!!!'});
  initializeStatus().then((status) => {
    socket.emit('get-status:init', status)
  });
  initializeLightStatus().then((status) => {
    socket.emit('get-light:init', status)
  });
  socket.on('atime', function(data) {
    sendTime();
    console.log(data);
  });
  socket.on('get-status:put', function(data) {
    updateStatus(data).then((status) => {
      console.log('Tank Status Updated');
    });
  });
  socket.on('get-light:put', function(data) {
    updateLightStatus(data).then((status) => {
      console.log('Light Status Updated');
    });
  });
  socket.on('tankSystem', function(data) {
    tankSystemId = socket.id;
    console.log('Received tank system Id :' + tankSystemId);
  });
  socket.on('lightSystem', function(data) {
    lightSystemId = socket.id;
    console.log('Received lights system Id :' + lightSystemId);
  });
  socket.on('disconnect', () => {
    if (socket.id === tankSystemId) {
      updateStatus({websocket: 'disconnected'}).then((status) => {
        console.log('Tank Status Updated');
      });
    }
    if (socket.id === lightSystemId) {
      updateLightStatus({websocket: 'disconnected'}).then((status) => {
        console.log('Light Status Updated');
      });
    }
    console.log('Client disconnected')
  });
});

mongoose.connect(mongo.uri, {useMongoClient: true});
mongoose.Promise = Promise;

// Populate databases with sample data
if (seedDB) {
  require('./seed');
}

webpush.setVapidDetails('mailto:vicky.gonsalves@outlook.com', PUBLIC_VAPID, PRIVATE_VAPID);

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
});

export default app;


function sendTime() {
  socketio.sockets.emit('atime', {time: new Date().toJSON()});
}
