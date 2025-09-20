import express from 'express';
import userRoutes from './user.routes.js';
import agentRoutes from './agent.routes.js';

const api = express.Router();

api.use("/user", userRoutes);
api.use("/agent", agentRoutes)

export default api;