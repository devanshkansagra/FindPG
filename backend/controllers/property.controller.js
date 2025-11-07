import { uploadFile, getFile } from '../utils/AWS.js';
import Property from '../model/property.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export async function addProperty(req, res) {
  const file = req.files?.image?.[0];
  const fileList = req.files?.fileList || [];
  const {
    propertyName,
    propertyType,
    price,
    deposit,
    location,
    address,
    amenities,
    rules,
    agentName,
    phone,
    ownerPhone,
    email,
  } = req.body;

  const agentId = req.user._id;
  try {
    await uploadFile(file?.buffer, file?.originalname, file?.mimetype);

    fileList.forEach(async (file) => {
      await uploadFile(file.buffer, file.originalname, file.mimetype);
    });

    const imageURL = await getFile(file?.originalname);
    const additionalImagesUrls = await Promise.all(
      fileList.map(async (file) => await getFile(file.originalname))
    );
    const newProperty = Property.create({
      agentId,
      propertyName,
      propertyType,
      price,
      deposit,
      location,
      address,
      amenities,
      rules,
      agentName,
      phone,
      ownerPhone,
      email,
      imageURL,
      additionalImages: additionalImagesUrls,
    });

    const response = (await newProperty).save();
    if (response) {
      res.status(201).send(new ApiResponse({ statusCode: 201, message: 'New Property Added' }));
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

export async function searchProperty(req, res) {
  const { city } = req.query;
  try {
    if (city === '') {
      const response = await Property.find().select();
      res.status(200).send(new ApiResponse({ statusCode: 200, data: response }));
    } else {
      const properties = await Property.find({ location: city });
      if (properties) {
        res.status(200).send(
          new ApiResponse({
            statusCode: 200,
            message: 'Properties fetched successfully',
            data: properties,
          })
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProperty(req, res) {
  const { id } = req.params;
  try {
    const response = await Property.findById(id);
    if (response) {
      await res.status(200).send(
        new ApiResponse({
          statusCode: 200,
          message: 'Property fetched successfully',
          data: response,
        })
      );
    }
  } catch (error) {}
}
