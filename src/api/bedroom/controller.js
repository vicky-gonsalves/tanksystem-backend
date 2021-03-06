import _ from 'lodash';
import {Bedroom} from '.'
import {notFound, success} from '../../services/response/'

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
    .then((getStatus) => {
      if (getStatus) {
        if (body.hasOwnProperty('light1')) {
          getStatus.markModified('light1');
        }
        if (body.hasOwnProperty('light2')) {
          getStatus.markModified('light2');
        }
        if (body.hasOwnProperty('light3')) {
          getStatus.markModified('light3');
        }
        if (body.hasOwnProperty('fan')) {
          getStatus.markModified('fan');
        }
        if (body.hasOwnProperty('websocket')) {
          getStatus.markModified('websocket');
        }
        if (body.hasOwnProperty('updatedByDevice')) {
          getStatus.markModified('updatedByDevice');
        }
        return _.merge(getStatus, body).save();
      }
    })
    .then((getStatus) => getStatus ? getStatus.view(true) : null)
    .then(success(res))
    .catch(next);

export const destroy = ({params}, res, next) =>
  Bedroom.findById(params.id)
    .then(notFound(res))
    .then((bedroom) => bedroom ? bedroom.remove() : null)
    .then(success(res, 204))
    .catch(next)


export const initializeBedroomStatus = () => {
  return new Promise(function(resolve, reject) {
    Bedroom.findOne({identifier: 'bedroom1'})
      .then((light) => {
        return resolve(light ? light.view() : null);
      })
      .catch(err => reject(err))
  })
};

export const updateBedroomStatus = (payload) => {
  return new Promise(function(resolve, reject) {
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
          return Object.assign(light, payload).save()
        }
      })
      .then((light) => {
        return resolve(light ? light.view() : null);
      })
      .catch(err => reject(err))
  })
};
