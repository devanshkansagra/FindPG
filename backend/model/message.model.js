import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    chats: {
        type: Schema.Types.ObjectId,
        ref: "chats",
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    reciever: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    content: {type: String},
    messageStatus: {
        type: String,
        default: "send",
    }
},{timestamps: true});

const Message = model("message", messageSchema);
export default Message;