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
        getStatus.markModified('light1');
        getStatus.markModified('light2');
        getStatus.markModified('light3');
        getStatus.markModified('fan');
        getStatus.markModified('websocket');
        return _.merge(body, getStatus).save();
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
          light.markModified('light1');
          light.markModified('light2');
          light.markModified('light3');
          light.markModified('fan');
          light.markModified('websocket');
          return Object.assign(light, payload).save()
        }
      })
      .then((light) => {
        return resolve(light ? light.view() : null);
      })
      .catch(err => reject(err))
  })
};
