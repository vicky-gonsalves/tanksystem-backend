import {Router} from 'express'
import {subscription, sendNotification} from './controller'

const router = new Router();

router.post('/', subscription);
router.post('/send-notification', sendNotification);

export default router
