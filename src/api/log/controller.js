import {Log} from '.';
import {notFound, success} from '../../services/response/';

export const create = ({bodymen: {body}}, res, next) =>
  Log.create(body)
    .then((log) => log.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({querymen: {query, select, cursor}}, res, next) =>
  Log.count(query)
    .then(count => Log.find(query, select, cursor)
      .then((logs) => ({
        count,
        rows: logs.map((log) => log.view())
      }))
    )
    .then(success(res))
    .catch(next);

export const show = ({params}, res, next) =>
  Log.findById(params.id)
    .then(notFound(res))
    .then((log) => log ? log.view() : null)
    .then(success(res))
    .catch(next);

export const update = ({bodymen: {body}, params}, res, next) =>
  Log.findById(params.id)
    .then(notFound(res))
    .then((log) => log ? Object.assign(log, body).save() : null)
    .then((log) => log ? log.view(true) : null)
    .then(success(res))
    .catch(next);

export const destroy = ({params}, res, next) =>
  Log.findById(params.id)
    .then(notFound(res))
    .then((log) => log ? log.remove() : null)
    .then(success(res, 204))
    .catch(next);


export const createLog = (payload) => {
  return new Promise(function(resolve, reject) {
    Log.create(payload)
      .then((log) => {
        return resolve();
      })
      .catch(err => reject(err))
  })
};
