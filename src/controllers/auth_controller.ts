import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';
import { createAccessToken } from '../utils/token_utils';

interface SignupRequest {
  email: string,
  password: string,
}

// Attempt to create a new user with an email and password provided in the request body
// Returns a 404 response if either the email or password are missing from the request
// Returns a 404 response if another user already exists with the email address
// Returns a 201 response with a signed JWT if the user is successfully created
export const signup = async (req: Request, res: Response, next: NextFunction) => {

  // Parse email and password fromt the request body
  const { email, password }: SignupRequest = req.body;

  try {

    // Validate that the email and password are provided
    if (!email || !password) {
      return res.status(404).json({ error: 'Invalid email address or password' });
    }

    // Check for existing user with the same email and return
    // error response if 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ error: 'Account already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user and save to database
    const newUser = new User({
      email: email,
      password: hashedPassword,
      username: 'Some Username',
    });
    newUser.save();

    // Generate JWT with the new userId and respond with success code
    const token = createAccessToken(newUser.id);
    return res.status(201).json({ success: true, token });

  } catch (error) {
    // Log error and call error handling middleware
    console.error('Error during signup:', error);
    next(error);
  }
};


// Attempt to login an existing user with an email and password provided in the request body.
// Returns a 401 response if the user does not exist or the password is incorrect.
// Returns a 200 response with a signed JWT if the login is successful
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Check if the user exists and outout 401 error if not found
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ error: 'Invalid email address or password' });
    }

    // Validate that the provided password is correct
    // Return 401 error if password is incorrect
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email address or password' });
    }

    // If valid credentials, sign a new token and return success response with token
    const token = createAccessToken(existingUser.id);
    res.status(200).json({ token: token });

  } catch (error) {
    // Log error and call error handling middleware
    console.error('Error occurred during login:', error);
    next(error);
  }
}