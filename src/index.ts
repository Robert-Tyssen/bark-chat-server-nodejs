import express from 'express';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/error_handler';
import apiRouter from './routes/api_router';
import { connectToMongoDb } from './db/db';

// Setup environment variables
const port = process.env.PORT || 4001;

// Connect to MongoDB
connectToMongoDb();

// Create express app
const app = express();

// Setup pre-router middlewares
app.use(express.json());

// Mount api router to route
app.use('/api', apiRouter);

// Error handling middleware
// Must come after all other middlewares
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});