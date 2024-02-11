import express from 'express';
import { createConversation } from '../controllers/conversation_controller';
import { validateConversationSchema, validateUserInParticipants } from '../middleware/conversation_validators';

// Create router
const router = express.Router();

// Create chat room
router.post('/create',
  validateConversationSchema(),
  validateUserInParticipants,
  createConversation
);

export default router;