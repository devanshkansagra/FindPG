import { Router } from 'express';
import { refreshAccessToken } from '../controllers/auth.controller.js';
const authRoutes = Router();

authRoutes.post('/token/refresh', refreshAccessToken);

export default authRoutes;
