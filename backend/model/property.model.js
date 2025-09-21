import { model, Schema } from 'mongoose';

const propertySchema = new Schema({
    propertyName: String,
    price: Number,
    Location: String,
    distance: String,
    imageURL: String,
    tags: [String]
});

const Property = model('properties', propertySchema);
export default Property;