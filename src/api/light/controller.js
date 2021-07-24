import {Light} from '.';
import {customSuccess, notFound, success} from '../../services/response/';

export const create = ({bodymen: {body}}, res, next) =>
  Light.create(body)
    .then((light) => light.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({querymen: {query, select, cursor}}, res, next) =>
  Light.count(query)
    .then(count => Light.find(query, select, cursor)
      .then((lights) => ({
        count,
        rows: lights.map((light) => light.view())
      }))
    )
    .then(success(res))
    .catch(next);

export const show = ({params}, res, next) =>
  Light.findById(params.id)
    .then(notFound(res))
    .then((light) => light ? light.view() : null)
    .then(success(res))
    .catch(next);

export const state = ({params}, res, next) =>
  Light.findOne({$or: [{light1: true}, {light2: true}, {light3: true}, {light4: true}]})
    .then((light) => light ? 'on' : 'off')
    .then(customSuccess(res))
    .catch(next);

export const update = ({bodymen: {body}, params}, res, next) =>
  Light.findOne({identifier: 'light'})
    .then(notFound(res))
    .then((light) => {
      if (light) {
        if (body.hasOwnProperty('light1')) {
          light.markModified('light1');
        }
        if (body.hasOwnProperty('light2')) {
          light.markModified('light2');
        }
        if (body.hasOwnProperty('light3')) {
          light.markModified('light3');
        }
        if (body.hasOwnProperty('light4')) {
          light.markModified('light4');
        }
        if (body.hasOwnProperty('websocket')) {
          light.markModified('websocket');
        }
        return Object.assign(light, body).save();
      }
    })
    .then((light) => light ? light.view(true) : null)
    .then(success(res))
    .catch(next);

export const destroy = ({params}, res, next) =>
  Light.findById(params.id)
    .then(notFound(res))
    .then((light) => light ? light.remove() : null)
    .then(success(res, 204))
    .catch(next);

export const initializeLightStatus = () => {
  return new Promise(function (resolve, reject) {
    Light.findOne({identifier: 'light'})
      .then((light) => {
        return resolve(light ? light.view() : null);
      })
      .catch(err => reject(err))
  })
};

export const updateLightStatus = (payload) => {
  return new Promise(function (resolve, reject) {
    Light.findOne({identifier: 'light'})
      .then((light) => {
        if (light) {
          if (payload.hasOwnProperty('light1')) {
            light.markModified('light1');
          }
          if (payload.hasOwnProperty('light2')) {
            light.markModified('light2');
          }
          if (payload.hasOwnProperty('light3')) {
            light.markModified('light3');
          }
          if (payload.hasOwnProperty('light4')) {
            light.markModified('light4');
          }
          if (payload.hasOwnProperty('websocket')) {
            light.markModified('websocket');
          }
          return Object.assign(light, payload).save()
        }
      })
      .then((light) => {
        return resolve(light ? light.view() : null);
      })
      .catch(err => reject(err))
  })
};
