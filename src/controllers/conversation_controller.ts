import { RequestHandler } from 'express';
import { Types } from 'mongoose';
import { Conversation } from '../models/Conversation';

interface CreateConversationRequest {
  name: string,
  type: string,
  participants: string[],
}

// Create a new chat room with the specified members
// TODO - refactor controller by separating parsing / validation logic
export const createConversation: RequestHandler = async (req, res, next) => {
  try {
    // Parse fields from request body
    const { name, type, participants }: CreateConversationRequest = req.body;

    // Convert all the string representations of the id's into ObjectId
    const userIds = participants.map((id) => new Types.ObjectId(id));

    // Create ChatRoom model and save to database
    const chatRoom = new Conversation({
      name: name,
      type: type,
      createdBy: res.locals.userId,
      participants: userIds,
    });

    await chatRoom.save();

    // Return success response to user with the id of the chat room
    return res.status(200).json({ id: chatRoom.id });

  } catch (error) {
    // Something went wrong during the chat room creation
    console.error('Error during chat room creation:', error);
    next(error);
  }
}