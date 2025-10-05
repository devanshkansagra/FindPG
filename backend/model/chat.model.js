import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
  lastMessage: {
    type: Schema.Types.ObjectId,
    ref: 'message',
  },
  unreadCount: {
    type: Number,
    default: 0
  },

}, {timestamps: true});

const Chat = model("chats", chatSchema);
export default Chat;
