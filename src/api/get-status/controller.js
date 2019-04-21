import {GetStatus} from '.'
import {notFound, success} from '../../services/response/'

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
    .then((getStatus) => getStatus ? Object.assign(getStatus, body).save() : null)
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
