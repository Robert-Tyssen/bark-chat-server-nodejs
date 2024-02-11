import express from 'express';
import { sendMessage } from '../controllers/message_controller';

// Create router for messaging
const router = express.Router();

router.post('/send', sendMessage);

export default router;