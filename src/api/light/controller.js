import {Light} from '.';
import {notFound, success} from '../../services/response/';

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

export const update = ({bodymen: {body}, params}, res, next) =>
  Light.findById(params.id)
    .then(notFound(res))
    .then((light) => light ? Object.assign(light, body).save() : null)
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
  return new Promise(function(resolve, reject) {
    Light.findOne({identifier: 'light'})
      .then((light) => {
        return resolve(light ? light.view() : null);
      })
      .catch(err => reject(err))
  })
};

export const updateLightStatus = (payload) => {
  return new Promise(function(resolve, reject) {
    Light.findOne({identifier: 'light'})
      .then((light) => {
        if (light) {
          light.markModified('light1');
          light.markModified('light2');
          light.markModified('light3');
          light.markModified('light4');
          light.markModified('websocket');
          Object.assign(light, payload).save()
        }
      })
      .then((light) => {
        return resolve(light ? light.view() : null);
      })
      .catch(err => reject(err))
  })
};
