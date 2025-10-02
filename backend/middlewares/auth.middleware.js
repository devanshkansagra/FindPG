import jwt from "jsonwebtoken";
import Agent from "../model/agent.model.js";

export async function verifyAgent(req, res, next) {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      res.status(401).json({ message: "No token, unauthorized" });
      return;
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await Agent.findById(decoded._id).select("-password");
    if (!user) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
}
