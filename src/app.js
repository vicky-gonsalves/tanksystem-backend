import http from 'http';
import * as Raspiinfo from 'raspiinfo';
import api from './api';
import {initializeBedroomStatus, updateBedroomStatus} from './api/bedroom/controller';
import {initializeStatus, updateStatus} from './api/get-status/controller';
import {initializeLightStatus, updateLightStatus} from './api/light/controller';
import {createLog} from './api/log/controller';
import {apiRoot, env, ip, isRaspberryPi, mongo, port, seedDB} from './config';
import express from './services/express';
import mongoose from './services/mongoose';

require('events').EventEmitter.defaultMaxListeners = 100;

console.log(env);

const app = express(apiRoot, api);
const server = http.createServer(app);
const socketio = require('socket.io')(server, {
  serveClient: env !== 'production',
  path: '/socket.io'
});

require('./socketio').default(socketio);

let tankSystemId;
let lightSystemId;
let bedroomSystemId;

socketio.use((socket, next) => {
  if (socket && socket.handshake && socket.handshake.headers && socket.handshake.headers.authorization) {
    const header = socket.handshake.headers['authorization'];
    let authentication = header.replace(/^Basic/, '');
    authentication = (new Buffer(authentication, 'base64')).toString('utf8');
    let loginInfo = authentication.split(':');

    switch (loginInfo[0]) {
      case 'tank00000000001':
        tankSystemId = socket.id;
        console.log('Received tank system Id :' + tankSystemId);
        break;
      case 'light00000000001':
        lightSystemId = socket.id;
        console.log('Received Light system Id :' + lightSystemId);
        break;
      case 'bed00000000001':
        bedroomSystemId = socket.id;
        console.log('Received bedroom system Id :' + bedroomSystemId);
        break;
      default:
        console.log('Received request from client');
        break;
    }

  }
  return next();
});

socketio.on('connection', (socket) => {
  switch (socket.id) {
    case tankSystemId:
      updateStatus({websocket: 'connected'}).then((status) => {
        console.log('Tank Status:connected Updated');
      });
      socket.emit('welcome', {message: 'Connected to Tank Server!!!!'});
      initializeStatus().then((status) => {
        socket.emit('get-status:init', status)
      });
      break;

    case lightSystemId:
      updateLightStatus({websocket: 'connected'}).then((status) => {
        console.log('Light Status:connected Updated');
      });
      socket.emit('welcome', {message: 'Connected to Light Server!!!!'});
      initializeLightStatus().then((status) => {
        socket.emit('get-light:init', status)
      });
      break;

    case bedroomSystemId:
      updateBedroomStatus({websocket: 'connected'}).then((status) => {
        console.log('Bedroom Status:connected Updated');
      });
      socket.emit('welcome', {message: 'Connected to Bedroom Server!!!!'});
      initializeBedroomStatus().then((status) => {
        socket.emit('bedroom:init', status)
      });
      break;

    default:
      console.log('Connected to Client Server!!!!');
      break;
  }

  // Need to call this even as soon as CLIENT is connected
  socket.on('init:status', function () {
    initializeStatus().then((status) => {
      socket.emit('get-status:init', status)
    });
  });
  socket.on('init:light', function () {
    initializeLightStatus().then((status) => {
      socket.emit('get-light:init', status)
    });
  });
  socket.on('init:bedroom', function () {
    initializeBedroomStatus().then((status) => {
      socket.emit('bedroom:init', status)
    });
  });


  socket.on('get-status:put', function (data) {
    updateStatus(data).then((status) => {
      console.log('Tank Status Updated');
    });
  });
  socket.on('get-light:put', function (data) {
    updateLightStatus(data).then((status) => {
      console.log('Light Status Updated');
    });
  });
  socket.on('bedroom:put', function (data) {
    updateBedroomStatus(data).then((status) => {
      console.log('Bedroom Status Updated');
    });
  });

  socket.on('log:save', function (data) {
    createLog(data).then(() => {
      console.log('log saved');
    });
  });

  let rep = 0;
  let temperature = 0;
  socket.on('dev:put', function (data) {
    rep++;
    if (rep >= 5000 && isRaspberryPi) {
      Raspiinfo.temp(function (temp) {
        temperature = temp;
      });
      rep = 0;
    }
    data.temp = temperature;
    socketio.sockets.emit('dev:save', data);
  });

  socket.on('disconnect', () => {
    switch (socket.id) {
      case tankSystemId:
        updateStatus({websocket: 'disconnected'}).then((status) => {
          console.log('Tank Status:Disconnected Updated');
        });
        break;

      case lightSystemId:
        updateLightStatus({websocket: 'disconnected'}).then((status) => {
          console.log('Light Status:Disconnected Updated');
        });
        break;

      case bedroomSystemId:
        updateBedroomStatus({websocket: 'disconnected'}).then((status) => {
          console.log('Bedroom Status:Disconnected Updated');
        });
        break;

      default:
        console.log('Client disconnected!!');
        break;
    }
  });
});

mongoose.connect(mongo.uri).then(() => {
  console.log('database connected');
  // Populate databases with sample data
  if (seedDB) {
    require('./seed');
  }
}).catch(e => console.log(e));

mongoose.Promise = Promise;


setImmediate(() => {
  server.listen(port, ip, () => {
    console.log("Express server Listening on " + server.address().address + ":" + server.address().port);
  })
});

export default app;


function sendTime() {
  socketio.sockets.emit('atime', {time: new Date().toJSON()});
}
