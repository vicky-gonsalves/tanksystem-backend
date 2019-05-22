import {Dev} from '.'
import {notFound, success} from '../../services/response/'

export const create = ({bodymen: {body}}, res, next) =>
  Dev.create(body)
    .then((dev) => dev.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({querymen: {query, select, cursor}}, res, next) =>
  Dev.count(query)
    .then(count => Dev.find(query, select, cursor)
      .then((devs) => ({
        count,
        rows: devs.map((dev) => dev.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({params}, res, next) =>
  Dev.findById(params.id)
    .then(notFound(res))
    .then((dev) => dev ? dev.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({bodymen: {body}, params}, res, next) =>
  Dev.findById(params.id)
    .then(notFound(res))
    .then((dev) => dev ? Object.assign(dev, body).save() : null)
    .then((dev) => dev ? dev.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({params}, res, next) =>
  Dev.findById(params.id)
    .then(notFound(res))
    .then((dev) => dev ? dev.remove() : null)
    .then(success(res, 204))
    .catch(next)


export const updateDevLog = (payload) => {
  return new Promise(function(resolve, reject) {
    Dev.findOne({identifier: 'log'})
      .then((dev) => {
        if (dev) {
          dev.markModified('distance');
          return Object.assign(dev, payload).save();
        }
      })
      .then((dev) => {
        return resolve(dev ? dev.view() : null);
      })
      .catch(err => reject(err))
  })
};
