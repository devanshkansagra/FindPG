import { Router } from 'express';
import { getNotifications, readNotification } from '../controllers/notification.controller.js';
import { verify } from '../middlewares/auth.middleware.js';

const notificationRoutes = Router();

notificationRoutes.get('/get', verify, getNotifications);
notificationRoutes.post('/read/:id', verify, readNotification);

export default notificationRoutes;
