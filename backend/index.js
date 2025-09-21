import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { connect } from './config/connect.js';
import api from './routes/api.js';
import multer from 'multer';
import { getFile, uploadFile } from './utils/AWS.js';
import Property from './model/property.model.js';
import { ApiResponse } from './utils/ApiResponse.js';
import { ApiError } from './utils/ApiError.js';

const app = express();
const port = 4000;

config();

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

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

// Temporary adding routes to add and fetch properties
app.post("/api/property/add", upload.single('image'), async function (req, res) {
    const file = req.file;
    const {propertyName, price, location, distance, tags} = req.body;

    try {
        await uploadFile(file.buffer, file.originalname, file.mimetype);

        const imageURL = await getFile(file.originalname);
        const tagArr = tags.split(',');
        const newProperty = Property.create({
            propertyName, price: Number.parseInt(price), location, distance, tags: ["a", "b"], imageURL
        })

        const response = (await newProperty).save();
        if(response) {
            res.status(201).send(new ApiResponse({statusCode: 201, message: "New Property Added"}));
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(new ApiError(500, error));
    }
})

app.get('/api/properties/get', async function (req, res) {
    try {
        const response = await Property.find().select();
        res.status(200).send(new ApiResponse({statusCode: 200, data: response}));
    } 
    catch(error) {
        res.status(500).send(new ApiError(500, error));
    }
})


app.listen(port, function() {
    console.log("Server started");
});