import { ApiError } from '../handlers/ApiError.js';
import jwt from 'jsonwebtoken';
export default function initSocket(io) {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new ApiError(404, 'Auth Token is missing'));

    try {
      const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      socket.user = user;
      next();
    } catch {
      next(new ApiError(401, 'Invalid Token'));
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.user._id;
    socket.join(`user:${userId}`);
  });
}
