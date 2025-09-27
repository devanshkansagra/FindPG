import { uploadFile, getFile } from "../utils/AWS.js";
import Property from "../model/property.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export async function addProperty(req, res) {
  const file = req.file;
  const { propertyName, price, location, distance, tags } = req.body;
  try {
    await uploadFile(file.buffer, file.originalname, file.mimetype);

    const imageURL = await getFile(file.originalname);
    const tagArr = tags.split(",").map((x) => x.trim());
    const newProperty = Property.create({
      propertyName,
      price: Number.parseInt(price),
      location,
      distance,
      tags: tagArr,
      imageURL,
    });

    const response = (await newProperty).save();
    if (response) {
      res
        .status(201)
        .send(
          new ApiResponse({ statusCode: 201, message: "New Property Added" })
        );
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiError(500, error));
  }
}

export async function fetchProperties(req, res) {
  try {
    const response = await Property.find().select();
    res.status(200).send(new ApiResponse({ statusCode: 200, data: response }));
  } catch (error) {
    res.status(500).send(new ApiError(500, error));
  }
}
