import express from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// @route   GET /api/users
router.get('/', protect, getUsers);
// @route   GET /api/users/:id
router.get('/:id', protect, getUserById);
// @route   PUT /api/users/:id
router.put('/:id', protect, updateUser);
// @route   DELETE /api/users/:id
router.delete('/:id', protect, deleteUser);

export default router;
