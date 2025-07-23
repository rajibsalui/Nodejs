import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/users.js';
import logger from '../utils/logger.js';
import { asyncHandler } from '../middlewares/errorHandler.js';

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ 
      success: false,
      message: 'User already exists' 
    });
  }
  
  const user = await User.create({ name, email, password });
  
  logger.info(`New user registered: ${email}`);
  
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    }
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    logger.info(`User logged in: ${email}`);
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      }
    });
  } else {
    logger.warn(`Failed login attempt for email: ${email}`);
    res.status(401).json({ 
      success: false,
      message: 'Invalid email or password' 
    });
  }
});