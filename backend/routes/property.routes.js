import { Router } from "express";
import {
  addProperty,
  fetchProperties,
} from "../controllers/property.controller.js";
import multer from "multer";
import { verifyAgent } from "../middlewares/auth.middleware.js";

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const propertyRoutes = Router();

propertyRoutes.post("/add", verifyAgent, upload.single("image"), addProperty);
propertyRoutes.get("/get", fetchProperties);

export default propertyRoutes;
