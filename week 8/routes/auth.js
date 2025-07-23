import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRegistration, validateLogin, handleValidationErrors } from '../middlewares/validation.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validateRegistration, handleValidationErrors, register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validateLogin, handleValidationErrors, login);

export default router;
