import express from 'express';
import authRouter from './auth_router';

const router = express.Router();

// Sub-router for authentication requests
router.use('/', authRouter);

export default router;