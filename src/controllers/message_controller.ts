import { RequestHandler } from "express";
import { Types } from "mongoose";
import { Message } from "../models/Message";

// Controller function to create a new message
export const sendMessage: RequestHandler = async (req, res, next) => {
  try {
    // Parse fields from the request body
    let conversation = new Types.ObjectId(req.body.conversation as string);
    let sender = new Types.ObjectId(res.locals.userId as string);
    let content: string = req.body.content;

    // Create message document and save to mongo
    const message = new Message({ conversation: conversation, sender: sender, content: content, });
    await message.save();

    // Return success response to user with the id of the message
    return res.status(200).json({ messageId: message.id });
  } catch (e) {
    // Something went wrong during message creation
    console.error('Error creating message:', e);
    next(e);
  }
}