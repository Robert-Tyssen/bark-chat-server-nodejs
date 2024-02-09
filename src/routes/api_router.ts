import express from 'express';
import { authMiddleware } from '../middleware/auth_middleware';
import authRouter from './auth_router';
import chatRoomRouter from './chat_room_router';

const router = express.Router();

// Sub-router for authentication requests
router.use('/', authRouter);

// Router for chat room requests
router.use('/chat-room', authMiddleware, chatRoomRouter);

export default router;