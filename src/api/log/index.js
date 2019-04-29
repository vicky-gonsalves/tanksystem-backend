import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Log, { schema } from './model'

const router = new Router()
const { action } = schema.tree

/**
 * @api {post} /logs Create log
 * @apiName CreateLog
 * @apiGroup Log
 * @apiParam action Log's action.
 * @apiSuccess {Object} log Log's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Log not found.
 */
router.post('/',
  body({ action }),
  create)

/**
 * @api {get} /logs Retrieve logs
 * @apiName RetrieveLogs
 * @apiGroup Log
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of logs.
 * @apiSuccess {Object[]} rows List of logs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /logs/:id Retrieve log
 * @apiName RetrieveLog
 * @apiGroup Log
 * @apiSuccess {Object} log Log's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Log not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /logs/:id Update log
 * @apiName UpdateLog
 * @apiGroup Log
 * @apiParam action Log's action.
 * @apiSuccess {Object} log Log's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Log not found.
 */
router.put('/:id',
  body({ action }),
  update)

/**
 * @api {delete} /logs/:id Delete log
 * @apiName DeleteLog
 * @apiGroup Log
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Log not found.
 */
router.delete('/:id',
  destroy)

export default router
