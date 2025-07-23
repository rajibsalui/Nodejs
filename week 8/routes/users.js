import express from 'express';
import {
  getUserById,
  
} from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();


// @route   GET /api/users/:id
router.get('/:id', protect, getUserById);

export default router;
