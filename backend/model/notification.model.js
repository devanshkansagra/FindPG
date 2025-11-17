import { model, Schema, Types } from 'mongoose';

const notificationSchema = new Schema({
  recipientId: {
    type: Types.ObjectId,
    ref: 'users',
    required: true,
  },
  actorId: {
    type: Types.ObjectId,
    ref: 'users',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
  },
  read: {
    type: Boolean,
    default: false,
  },
  delivered: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = model('notifications', notificationSchema);
export default Notification;
