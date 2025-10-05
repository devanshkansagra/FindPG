import { Router } from 'express';
import { fetchUsers } from '../controllers/chat.controller';

const chatRoutes = Router();

chatRoutes.get('/getAllUsers', fetchUsers);

export default chatRoutes;
