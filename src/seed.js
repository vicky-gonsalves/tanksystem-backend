"use strict";

import GetStatus from './api/get-status/model';

const seedGetStatus = true;

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
