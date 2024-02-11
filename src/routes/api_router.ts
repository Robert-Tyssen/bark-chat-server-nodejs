import express from 'express';
import { authMiddleware } from '../middleware/auth_middleware';
import authRouter from './auth_router';
import conversationRouter from './conversation_router';

const router = express.Router();

// Sub-router for authentication requests
router.use('/', authRouter);

// Router for chat room requests
router.use('/conversation', authMiddleware, conversationRouter);

export default router;