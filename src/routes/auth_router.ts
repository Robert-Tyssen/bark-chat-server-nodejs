import express from 'express';
import { notImplemented } from '../middleware/not_implemented';

// Create router
const router = express.Router();

// Route for signup with email and password
// TODO - implement signup route
router.post('/signup', notImplemented);

// Route for login with email and password
// TODO - implement login route
router.post('/login', notImplemented);

// Route for logout
// TODO - implement logout route
router.post('/logout', notImplemented);

// Route for reset password
// TODO - implement reset-password route
router.post('/reset-password', notImplemented);