import express from 'express';
import http from 'http';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { connect } from './config/connect.js';
import api from './routes/api.js';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const port = 4000;

config();

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST'],
  },
});
io.on('connection', (socket) => {
  console.log('New User connected: with: ', socket.id);
});

app.use('/api', api);

server.listen(port, function () {
  console.log('Server started');
});
