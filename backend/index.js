import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { connect } from './config/connect.js';
import api from './routes/api.js';

const app = express();
const port = 4000;

config();

app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
}))

connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api", api);

app.listen(port, function() {
    console.log("Server started");
});