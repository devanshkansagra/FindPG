import express from 'express';
import userRoutes from './user.routes.js';
import propertyRoutes from './property.routes.js';
import authRoutes from './auth.routes.js';
import enquiryRoutes from './enquiry.routes.js';

const api = express.Router();

api.use('/user', userRoutes);
api.use('/property', propertyRoutes);
api.use('/auth', authRoutes);
api.use('/enquiry', enquiryRoutes);

export default api;
