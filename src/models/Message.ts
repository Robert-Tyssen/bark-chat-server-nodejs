import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    conversation: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true, },
    content: { type: String, required: true, }
  },
  { timestamps: true }
);

export const Message = model('Message', messageSchema)