import express from 'express';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/error_handler';
import apiRouter from './routes/api_router';

// Create express app
const app = express();

// Setup environment variables
const port = process.env.PORT || 4001;
const db = process.env.MONGO_DB_URI || '';

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('Succesfully connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

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