import {middleware as body} from 'bodymen';
import {Router} from 'express';
import {middleware as query} from 'querymen';
import {create, destroy, index, show, update} from './controller';
import {schema} from './model';

export GetStatus, {schema} from './model';

const router = new Router();
const {motor, automate, tankFilled, websocket, cutOff, cutOffAt, waterHeight, skipCutoff, updatedByDevice, devLogs, maxMotorOnTime, quantity, flowRate} = schema.tree;

/**
 * @api {post} /get-statuses Create get status
 * @apiName CreateGetStatus
 * @apiGroup GetStatus
 * @apiParam motor Get status's motor.
 * @apiSuccess {Object} getStatus Get status's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Get status not found.
 */
router.post('/',
  body({
    motor,
    automate,
    tankFilled,
    websocket,
    cutOff,
    cutOffAt,
    waterHeight,
    skipCutoff,
    updatedByDevice,
    devLogs,
    quantity,
    maxMotorOnTime,
    flowRate
  }),
  create);

/**
 * @api {get} /get-statuses Retrieve get statuses
 * @apiName RetrieveGetStatuses
 * @apiGroup GetStatus
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of get statuses.
 * @apiSuccess {Object[]} rows List of get statuses.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index);

/**
 * @api {get} /get-statuses/:id Retrieve get status
 * @apiName RetrieveGetStatus
 * @apiGroup GetStatus
 * @apiSuccess {Object} getStatus Get status's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Get status not found.
 */
router.get('/:id',
  show);

/**
 * @api {put} /get-statuses/:id Update get status
 * @apiName UpdateGetStatus
 * @apiGroup GetStatus
 * @apiParam motor Get status's motor.
 * @apiSuccess {Object} getStatus Get status's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Get status not found.
 */
router.put('/:id',
  body({
    motor,
    automate,
    tankFilled,
    websocket,
    cutOff,
    cutOffAt,
    waterHeight,
    skipCutoff,
    updatedByDevice,
    devLogs,
    quantity,
    maxMotorOnTime,
    flowRate
  }),
  update);

/**
 * @api {delete} /get-statuses/:id Delete get status
 * @apiName DeleteGetStatus
 * @apiGroup GetStatus
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Get status not found.
 */
router.delete('/:id',
  destroy);

export default router
