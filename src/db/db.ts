import mongoose from "mongoose";

const connectionUrl = process.env.MONGO_DB_CONNECTION || '';

// TODO - need better error handling in case of connection failure
export const connectToMongoDb = () => {
  // Connect to MongoDB
  mongoose
    .connect(connectionUrl)
    .then(() => console.log('Succesfully connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB', err));
}