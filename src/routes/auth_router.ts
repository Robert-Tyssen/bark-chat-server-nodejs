import express from 'express';
import { notImplemented } from '../middleware/not_implemented';
import { login, signup } from '../controllers/auth_controller';

// Create router
const router = express.Router();

// Route for signup with email and password
router.post('/signup', signup);

// Route for login with email and password
router.post('/login', login);

// Route for logout
// TODO - implement logout route
router.post('/logout', notImplemented);

// Route for reset password
// TODO - implement reset-password route
router.post('/reset-password', notImplemented);

export default router;