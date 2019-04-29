import http from 'http';
import api from './api';
import {initializeStatus, updateStatus} from './api/get-status/controller';
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

socketio.on('connection', (socket) => {
  console.log("Connected");
  socket.emit('welcome', {message: 'Connected !!!!'});
  initializeStatus().then((status) => {
    socket.emit('get-status:init', status)
  });
  socket.on('connection', function(data) {
    console.log(data);
  });
  socket.on('atime', function(data) {
    sendTime();
    console.log(data);
  });
  socket.on('get-status:put', function(data) {
    updateStatus(data).then((status) => {
      console.log('Status Updated');
    });
  });
  socket.on('disconnect', () => console.log('Client disconnected'));
});

mongoose.connect(mongo.uri, {useMongoClient: true});
mongoose.Promise = Promise;

// Populate databases with sample data
if (seedDB) {
  require('./seed');
}
const fakeDatabase = [];
webpush.setVapidDetails('mailto:vicky.gonsalves@outlook.com', PUBLIC_VAPID, PRIVATE_VAPID);

app.post('/subscription', (req, res) => {
  const subscription = req.body;
  fakeDatabase.push(subscription)
});

app.post('/sendNotification', (req, res) => {
  const notificationPayload = {
    notification: {
      title: 'New Notification',
      body: 'This is the body of the notification',
      icon: 'assets/icons/icon-512x512.png',
    },
  };

  const promises = [];
  fakeDatabase.forEach(subscription => {
    promises.push(
      webpush.sendNotification(
        subscription,
        JSON.stringify(notificationPayload)
      )
    )
  });
  Promise.all(promises).then(() => res.sendStatus(200));
});


setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
  })
});

export default app;


function sendTime() {
  socketio.sockets.emit('atime', {time: new Date().toJSON()});
}
