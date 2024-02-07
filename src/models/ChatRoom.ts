import { Schema, model } from "mongoose";

const chatRoomSchema = new Schema({
  name: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export const ChatRoom = model('ChatRoom', chatRoomSchema);