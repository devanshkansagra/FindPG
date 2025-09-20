import express from 'express';
import { login, signup, profile } from '../controllers/user.controller.js';

const userRoutes = express.Router();

userRoutes.post("/login", login);
userRoutes.post("/signup", signup);
userRoutes.get("/profile", profile);


export default userRoutes;