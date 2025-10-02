import express from 'express';
import { login, signup, profile, logout } from '../controllers/agent.controller.js';

const agentRoutes = express.Router();

agentRoutes.post("/login", login);
agentRoutes.post("/signup", signup);
agentRoutes.get("/profile", profile);
agentRoutes.get("/logout", logout);


export default agentRoutes;