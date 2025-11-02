import { Router } from 'express';
import { verify } from '../middlewares/auth.middleware.js';
import { getEnquiries, sendEnquiry } from '../controllers/enquiry.controller.js';

const enquiryRoutes = Router();

enquiryRoutes.post('/send', verify, sendEnquiry);
enquiryRoutes.get('/get', verify, getEnquiries);

export default enquiryRoutes;
