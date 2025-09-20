import express from 'express';
import { login, signup, profile } from '../controllers/agent.controller.js';

const agentRoutes = express.Router();

agentRoutes.post("/login", login);
agentRoutes.post("/signup", signup);
agentRoutes.get("/profile", profile);


export default agentRoutes;