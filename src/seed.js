"use strict";

import Dev from './api/dev/model';
import GetStatus from './api/get-status/model';
import Light from './api/light/model';

const seedGetStatus = true;
const seedLight = true;
const seedDev = true;

if (seedGetStatus) {
  GetStatus.find({}).remove()
    .then(() => {
      GetStatus.create({
        identifier: 'status',
        tankFilled: 80,
        waterHeight: 100,
        motor: 'off',
        websocket: 'disconnected'
      });
    })
    .then(() => {
      console.log('Finished seeding GetStatus');
    })
    .catch(e => console.log(e));
}

if (seedLight) {
  Light.find({}).remove()
    .then(() => {
      Light.create({
        identifier: 'light',
        light1: false,
        light2: false,
        light3: false,
        light4: false,
        websocket: 'disconnected',
        flag: false
      });
    })
    .then(() => {
      console.log('Finished seeding Light');
    })
    .catch(e => console.log(e));
}

if (seedDev) {
  Dev.find({}).remove()
    .then(() => {
      Dev.create({
        identifier: 'log',
        distance: 0
      });
    })
    .then(() => {
      console.log('Finished seeding Dev');
    })
    .catch(e => console.log(e));
}
