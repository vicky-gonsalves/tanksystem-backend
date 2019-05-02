"use strict";

import GetStatus from './api/get-status/model';
import Light from './api/light/model';

const seedGetStatus = true;
const seedLight = true;

if (seedGetStatus) {
  GetStatus.find({}).remove()
    .then(() => {
      GetStatus.create({
        identifier: 'status',
        motor: 'off'
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
        flag: false
      });
    })
    .then(() => {
      console.log('Finished seeding Light');
    })
    .catch(e => console.log(e));
}
