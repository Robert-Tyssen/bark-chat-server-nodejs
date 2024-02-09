import express from 'express';
import { createChatRoom } from '../controllers/chat_room_controller';

// Create router
const router = express.Router();

// Create chat room
router.post('/create', createChatRoom);

export default router;