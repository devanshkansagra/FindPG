import { model, Schema } from 'mongoose';

const reviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  propertyId: {
    type: Schema.Types.ObjectId,
    ref: 'properties',
  },
  name: {
    type: String,
  },
  ratings: {
    type: Number,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const Review = model('reviews', reviewSchema);
export default Review;
