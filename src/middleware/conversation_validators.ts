import { RequestHandler } from "express";
import { body } from "express-validator";
import { Types } from "mongoose";
import { schemaValidationErrorHandler } from "./schema_validation";
import { User } from "../models/User";

export const validateConversationSchema = () => [
  // Conversation type must be either 'individual' or 'group'
  body('type').isIn(['individual', 'group']),
  
  // Conversation name is required and must be a string when type is group
  body('name')
    .if(body('type').equals('group'))
    .notEmpty(),
  
    // Participants must be an array with minimum two entries
  // If type is individual, then must have exactly two entries
  body('participants')
    .isArray({ min: 2, max: 100 }).withMessage('TEST')
    .if(body('type').equals('individual'))
    .isArray({ min: 2, max: 2 }),

  // Each entry in participants must be a mongo object id
  body('participants.*')
    .isMongoId()
    .withMessage('Participants must be valid user ids'),

  // After all schema validations, run the error handler to check
  // for errors and call the next middlewares if everything passes
  schemaValidationErrorHandler,
];

// Middleware to validate that the user submitting the request is
// one of the participants
export const validateUserInParticipants: RequestHandler = (req, res, next) => {
  // Get the submitting user from res.locals
  let userId = res.locals.userId;
  // Extract participants from validated schema data
  let participants: string[] = req.body.participants;

  // If user not in participants, then return an error
  if (participants.indexOf(userId) === -1) {
    return res.status(400).send({ error: 'Request user must be in participants' });
  }

  next();
}

// // Middleware to validate that all participants are existing users
// export const validateParticipantsExist: RequestHandler = async (req, res, next) => {

//   let errors: any[] = [];

//   let participants: string[] = req.body.participants;
//   let participantIds = participants.map((id) => new Types.ObjectId(id));

//   let users = await User.find({_id: { $in: participantIds }});


//   if (users.length < participantIds.length) {
//     return res.status(400).send({error: 'All partipants must be existing users'});
//   }
// }