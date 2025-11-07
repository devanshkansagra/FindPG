import { Router } from 'express';
import {
  addProperty,
  fetchProperties,
  searchProperty,
} from '../controllers/property.controller.js';
import multer from 'multer';
import { verify } from '../middlewares/auth.middleware.js';

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const propertyRoutes = Router();

propertyRoutes.post(
  '/add',
  verify,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'fileList', maxCount: 4 },
  ]),
  addProperty
);
propertyRoutes.get('/get', fetchProperties);
propertyRoutes.get('/search', searchProperty);

export default propertyRoutes;
