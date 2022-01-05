import _ from 'lodash';
import {Bedroom} from '.'
import {notFound, success} from '../../services/response/'
import * as wol from 'wol';

export const create = ({bodymen: {body}}, res, next) =>
  Bedroom.create(body)
    .then((bedroom) => bedroom.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({querymen: {query, select, cursor}}, res, next) =>
  Bedroom.count(query)
    .then(count => Bedroom.find(query, select, cursor)
      .then((bedrooms) => ({
        count,
        rows: bedrooms.map((bedroom) => bedroom.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({params}, res, next) =>
  Bedroom.findById(params.id)
    .then(notFound(res))
    .then((bedroom) => bedroom ? bedroom.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({bodymen: {body}, params}, res, next) =>
  Bedroom.findOne({identifier: params.id})
    .then(notFound(res))
    .then((plug) => plug ? Object.assign(plug, body).save() : null)
    .then((plug) => plug ? plug.view(true) : null)
    .then(success(res))
    .catch(next);

export const destroy = ({params}, res, next) =>
  Bedroom.findById(params.id)
    .then(notFound(res))
    .then((bedroom) => bedroom ? bedroom.remove() : null)
    .then(success(res, 204))
    .catch(next)


export const initializeBedroomStatus = () => {
  return new Promise(function (resolve, reject) {
    Bedroom.findOne({identifier: 'bedroom1'})
      .then((light) => {
        return resolve(light ? light.view() : null);
      })
      .catch(err => reject(err))
  })
};

export const updateBedroomStatus = (payload) => {
  return new Promise(function (resolve, reject) {
    Bedroom.findOne({identifier: 'bedroom1'})
      .then((light) => {
        if (light) {
          if (light.hasOwnProperty('light1')) {
            light.markModified('light1');
          }
          if (light.hasOwnProperty('light2')) {
            light.markModified('light2');
          }
          if (light.hasOwnProperty('light3')) {
            light.markModified('light3');
          }
          if (light.hasOwnProperty('fan')) {
            light.markModified('fan');
          }
          if (light.hasOwnProperty('websocket')) {
            light.markModified('websocket');
          }
          if (light.hasOwnProperty('updatedByDevice')) {
            light.markModified('updatedByDevice');
          }
          return Object.assign(light, payload).save();
        }
      })
      .then((light) => {
        return resolve(light ? light.view() : null);
      })
      .catch(err => reject(err))
  })
};

export const wakePC = ({params}, res, next) => {
  console.log('Waking up PC: 08:62:66:9E:B2:90 on IP 192.168.0.247');
  wol.wake('08:62:66:9E:B2:90', {
    address: '192.168.0.247',
    port: 9
  }, (err, done) => {
    if (err) {
      console.log('Error turning ON PC');
      console.log(err);
      return res.status(500).end();
    }
    console.log('Turned ON PC: ' + done);
    return res.send('PC turned ON');
  });
};
