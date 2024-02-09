import { RequestHandler } from 'express';
import { Types } from 'mongoose';
import { ChatRoom } from '../models/ChatRoom';
import { User } from '../models/User';

interface CreateChatRoomRequest {
  name: string,
  members: string[],
}

// Create a new chat room with the specified members
// TODO - refactor controller by separating parsing / validation logic
export const createChatRoom: RequestHandler = async (req, res, next) => {
  try {

    // Start with empty errors list
    const errors: any[] = [];

    // Parse fields from request body
    const { name, members }: CreateChatRoomRequest = req.body;

    // Validate that name is provided
    if (!name) {
      errors.push({
        'code': 'invalid-name',
        'message': 'Chat room name cannot be empty',
      });
    }

    // Validate that members is not empty
    if (!members.length) {
      errors.push({
        'code': 'invalid-member-ids',
        'message': 'Chat room members are required',
      });
    }

    // If the current user is not already a member, then insert them into members
    if (members.indexOf(res.locals.userId) === -1) {
      members.push(res.locals.userId);
    }

    // Convert all the string representations of the id's into ObjectId
    const users = await User.find({ '_id': { $in: members } });

    // Create ChatRoom model and save to database
    const chatRoom = new ChatRoom({
      name: name,
      createdBy: res.locals.userId,
      members: users.map((user) => user._id),
    });
    chatRoom.save();

    // Return success response to user with the id of the chat room
    return res.status(200).json({ id: chatRoom.id });

  } catch (error) {
    // Something went wrong during the chat room creation
    console.error('Error during chat room creation:', error);
    next(error);
  }
}