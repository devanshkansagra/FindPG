import { io } from 'socket.io-client';
import Cookie from './Cookie';

const accessToken = Cookie.get('accessToken');
export const socket = io(import.meta.env.VITE_SERVER_ORIGIN, {
  auth: { token: accessToken },
});
