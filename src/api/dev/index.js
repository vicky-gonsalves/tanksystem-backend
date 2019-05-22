import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Dev, { schema } from './model'

const router = new Router()
const { identifier, distance } = schema.tree

/**
 * @api {post} /dev Create dev
 * @apiName CreateDev
 * @apiGroup Dev
 * @apiParam identifier Dev's identifier.
 * @apiParam distance Dev's distance.
 * @apiSuccess {Object} dev Dev's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Dev not found.
 */
router.post('/',
  body({ identifier, distance }),
  create)

/**
 * @api {get} /dev Retrieve devs
 * @apiName RetrieveDevs
 * @apiGroup Dev
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of devs.
 * @apiSuccess {Object[]} rows List of devs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /dev/:id Retrieve dev
 * @apiName RetrieveDev
 * @apiGroup Dev
 * @apiSuccess {Object} dev Dev's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Dev not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /dev/:id Update dev
 * @apiName UpdateDev
 * @apiGroup Dev
 * @apiParam identifier Dev's identifier.
 * @apiParam distance Dev's distance.
 * @apiSuccess {Object} dev Dev's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Dev not found.
 */
router.put('/:id',
  body({ identifier, distance }),
  update)

/**
 * @api {delete} /dev/:id Delete dev
 * @apiName DeleteDev
 * @apiGroup Dev
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Dev not found.
 */
router.delete('/:id',
  destroy)

export default router
