import { Router } from 'express';
import { verify } from '../middlewares/auth.middleware.js';
import { sendEnquiry } from '../controllers/enquiry.controller.js';

const enquiryRoutes = Router();

enquiryRoutes.post('/send', verify, sendEnquiry);

export default enquiryRoutes;
