import { model, Schema } from 'mongoose';

const enquirySchema = new Schema({
  agentId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  propertyName: {
    type: String,
  },
  propertyType: {
    type: String,
  },
  budget: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Contacted', 'Closed'],
  },
});

const Enquiry = model('enquiries', enquirySchema);
export default Enquiry;
