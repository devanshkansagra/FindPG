import { model, Schema } from 'mongoose';

const propertySchema = new Schema({
  agentId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  propertyName: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  deposit: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  amenities: {
    type: [String],
    required: true,
  },
  rules: {
    type: [String],
    required: true,
  },
  agentName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  ownerPhone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
  },
  additionalImages: {
    type: [String],
  },
});

const Property = model('properties', propertySchema);
export default Property;
