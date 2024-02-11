import express from 'express';
import { authMiddleware } from '../middleware/auth_middleware';
import authRouter from './auth_router';
import conversationRouter from './conversation_router';
import messageRouter from './message_router';

// Create a public and protected router
const publicRouter = express.Router();
const protectedRouter = express.Router();

// Create api router 
const apiRouter = express.Router();
apiRouter.use(publicRouter, protectedRouter)

// *******************
// Public routes
// *******************

// Authentication requests
publicRouter.use('/', authRouter);

// *******************
// Protected routes
// *******************

// Use auth middleware to verify tokens before all protected routes
protectedRouter.use(authMiddleware);

// Routers for conversations and messaging
protectedRouter.use('/conversation', conversationRouter);
protectedRouter.use('/message', messageRouter)


export default apiRouter;