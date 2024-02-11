import { Schema, model } from "mongoose";

const conversationSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['individual', 'group'], required: true, },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
});

export const Conversation = model('Conversation', conversationSchema);