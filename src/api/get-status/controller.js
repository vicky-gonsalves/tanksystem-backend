import moment from 'moment';
import {GetStatus} from '.';
import {notFound, success} from '../../services/response/';

export const create = ({bodymen: {body}}, res, next) =>
  GetStatus.create(body)
    .then((getStatus) => getStatus.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({querymen: {query, select, cursor}}, res, next) =>
  GetStatus.count(query)
    .then(count => GetStatus.find(query, select, cursor)
      .then((getStatuses) => ({
        count,
        rows: getStatuses.map((getStatus) => getStatus.view())
      }))
    )
    .then(success(res))
    .catch(next);

export const show = ({params}, res, next) =>
  GetStatus.findOne({identifier: params.id})
    .then(notFound(res))
    .then((getStatus) => getStatus ? getStatus.view() : null)
    .then(success(res))
    .catch(next);

export const update = ({bodymen: {body}, params}, res, next) =>
  GetStatus.findOne({identifier: params.id})
    .then(notFound(res))
    .then((getStatus) => {
      if (getStatus) {
        if (body.hasOwnProperty('motor')) {
          getStatus.markModified('motor');
        }
        if (body.hasOwnProperty('automate')) {
          getStatus.markModified('automate');
        }
        if (body.hasOwnProperty('cutOff')) {
          getStatus.markModified('cutOff');
        }
        if (body.hasOwnProperty('cutOffAt')) {
          body.cutOffAt = moment();
          getStatus.markModified('cutOffAt');
        }
        if (body.hasOwnProperty('tankFilled')) {
          getStatus.markModified('tankFilled');
        }
        if (body.hasOwnProperty('websocket')) {
          getStatus.markModified('websocket');
        }
        if (body.hasOwnProperty('waterHeight')) {
          getStatus.markModified('waterHeight');
        }
        if (body.hasOwnProperty('skipCutoff')) {
          getStatus.markModified('skipCutoff');
        }
        if (body.hasOwnProperty('devLogs')) {
          getStatus.markModified('devLogs');
        }
        if (body.hasOwnProperty('flowRate')) {
          getStatus.markModified('flowRate');
        }
        if (body.hasOwnProperty('quantity')) {
          getStatus.markModified('quantity');
        }
        if (body.hasOwnProperty('updatedByDevice')) {
          getStatus.markModified('updatedByDevice');
        }
        return Object.assign(getStatus, body).save();
      }
    })
    .then((getStatus) => getStatus ? getStatus.view(true) : null)
    .then(success(res))
    .catch(next);

export const destroy = ({params}, res, next) =>
  GetStatus.findById(params.id)
    .then(notFound(res))
    .then((getStatus) => getStatus ? getStatus.remove() : null)
    .then(success(res, 204))
    .catch(next);

export const initializeStatus = () => {
  return new Promise(function(resolve, reject) {
    GetStatus.findOne({identifier: 'status'})
      .then((getStatus) => {
        return resolve(getStatus ? getStatus.view() : null);
      })
      .catch(err => reject(err))
  })
};

export const updateStatus = (payload) => {
  return new Promise(function(resolve, reject) {
    GetStatus.findOne({identifier: 'status'})
      .then((getStatus) => {
        if (getStatus) {
          if (payload.hasOwnProperty('motor')) {
            getStatus.markModified('motor');
          }
          if (payload.hasOwnProperty('automate')) {
            getStatus.markModified('automate');
          }
          if (payload.hasOwnProperty('cutOff')) {
            getStatus.markModified('cutOff');
          }
          if (payload.hasOwnProperty('cutOffAt')) {
            payload.cutOffAt = moment();
            getStatus.markModified('cutOffAt');
          }
          if (payload.hasOwnProperty('tankFilled')) {
            getStatus.markModified('tankFilled');
          }
          if (payload.hasOwnProperty('websocket')) {
            getStatus.markModified('websocket');
          }
          if (payload.hasOwnProperty('waterHeight')) {
            getStatus.markModified('waterHeight');
          }
          if (payload.hasOwnProperty('skipCutoff')) {
            getStatus.markModified('skipCutoff');
          }
          if (payload.hasOwnProperty('devLogs')) {
            getStatus.markModified('devLogs');
          }
          if (payload.hasOwnProperty('flowRate')) {
            getStatus.markModified('flowRate');
          }
          if (payload.hasOwnProperty('quantity')) {
            getStatus.markModified('quantity');
          }
          if (payload.hasOwnProperty('updatedByDevice')) {
            getStatus.markModified('updatedByDevice');
          }
          return Object.assign(getStatus, payload).save();
        }
      })
      .then((getStatus) => {
        return resolve(getStatus ? getStatus.view() : null);
      })
      .catch(err => reject(err))
  })
};
