import express from 'express';
import userRoutes from './user.routes.js';
import propertyRoutes from './property.routes.js';

const api = express.Router();

api.use('/user', userRoutes);
api.use('/property', propertyRoutes);

export default api;
