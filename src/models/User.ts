import mongoose, { Schema, model } from 'mongoose';

interface IUser {
  username: string,
  email: string,
  salt: string,
  password: string,
  createdAt: Date,
}

const userSchema = new Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  salt: { type: String, required: true, },
  password: { type: String, required: true },
});

export const User = model('User', userSchema);