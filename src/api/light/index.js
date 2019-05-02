import {middleware as body} from 'bodymen'
import {Router} from 'express'
import {middleware as query} from 'querymen'
import {create, destroy, index, show, update} from './controller'
import {schema} from './model'

export Light, {schema} from './model'

const router = new Router();
const {light1, light2, light3, light4, websocket, flag} = schema.tree;

/**
 * @api {post} /lights Create light
 * @apiName CreateLight
 * @apiGroup Light
 * @apiParam light1 Light's light1.
 * @apiParam light2 Light's light2.
 * @apiParam light3 Light's light3.
 * @apiParam light4 Light's light4.
 * @apiSuccess {Object} light Light's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Light not found.
 */
router.post('/',
  body({light1, light2, light3, light4, websocket, flag}),
  create);

/**
 * @api {get} /lights Retrieve lights
 * @apiName RetrieveLights
 * @apiGroup Light
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of lights.
 * @apiSuccess {Object[]} rows List of lights.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index);

/**
 * @api {get} /lights/:id Retrieve light
 * @apiName RetrieveLight
 * @apiGroup Light
 * @apiSuccess {Object} light Light's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Light not found.
 */
router.get('/:id',
  show);

/**
 * @api {put} /lights/:id Update light
 * @apiName UpdateLight
 * @apiGroup Light
 * @apiParam light1 Light's light1.
 * @apiParam light2 Light's light2.
 * @apiParam light3 Light's light3.
 * @apiParam light4 Light's light4.
 * @apiSuccess {Object} light Light's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Light not found.
 */
router.put('/:id',
  body({light1, light2, light3, light4, websocket, flag}),
  update);

/**
 * @api {delete} /lights/:id Delete light
 * @apiName DeleteLight
 * @apiGroup Light
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Light not found.
 */
router.delete('/:id',
  destroy);

export default router
