import {middleware as body} from 'bodymen'
import {Router} from 'express'
import {middleware as query} from 'querymen'
import {create, destroy, index, show, update, wakePC} from './controller'
import {schema} from './model'

export Bedroom, {schema} from './model'

const router = new Router()
const {light1, light2, light3, fan, websocket, updatedByDevice} = schema.tree

/**
 * @api {post} /bedroom Create bedroom
 * @apiName CreateBedroom
 * @apiGroup Bedroom
 * @apiParam light1 Bedroom's light1.
 * @apiParam light2 Bedroom's light2.
 * @apiParam light3 Bedroom's light3.
 * @apiParam fan Bedroom's fan.
 * @apiSuccess {Object} bedroom Bedroom's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bedroom not found.
 */
router.post('/',
  body({light1, light2, light3, fan, websocket, updatedByDevice}),
  create)

/**
 * @api {get} /bedroom Retrieve bedrooms
 * @apiName RetrieveBedrooms
 * @apiGroup Bedroom
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of bedrooms.
 * @apiSuccess {Object[]} rows List of bedrooms.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /bedroom/:id Retrieve bedroom
 * @apiName RetrieveBedroom
 * @apiGroup Bedroom
 * @apiSuccess {Object} bedroom Bedroom's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bedroom not found.
 */
router.get('/:id',
  show)

/**
 * @api {get} /bedroom/pc/turnon Update bedroom
 * @apiName UpdateBedroomPCStatus
 * @apiGroup Bedroom
 * @apiSuccess {Object} bedroom Bedroom's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bedroom not found.
 */
router.get('/pc/turnon',
  wakePC)

/**
 * @api {put} /bedroom/:id Update bedroom
 * @apiName UpdateBedroom
 * @apiGroup Bedroom
 * @apiParam light1 Bedroom's light1.
 * @apiParam light2 Bedroom's light2.
 * @apiParam light3 Bedroom's light3.
 * @apiParam fan Bedroom's fan.
 * @apiSuccess {Object} bedroom Bedroom's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Bedroom not found.
 */
router.put('/:id',
  body({
    light1: {type: Boolean, required: false},
    light2: {type: Boolean, required: false},
    light3: {type: Boolean, required: false},
    fan: {type: Boolean, required: false},
    websocket: {type: String, required: false},
    updatedByDevice: {type: Boolean, required: false}
  }),
  update)

/**
 * @api {delete} /bedroom/:id Delete bedroom
 * @apiName DeleteBedroom
 * @apiGroup Bedroom
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Bedroom not found.
 */
router.delete('/:id',
  destroy)

export default router
