import express from 'express';
import upload from '../config/multer.js';
import { protect } from '../middlewares/auth.js';
import { validateFileUpload, handleValidationErrors } from '../middlewares/validation.js';
import {
  uploadToCloudinary,
} from '../controllers/fileController.js';

const router = express.Router();

// @route   POST /api/files/upload-cloud
// @desc    Upload file to Cloudinary
// @access  Private
router.post('/upload-cloud', 
  protect, 
  upload.single('file'), 
  validateFileUpload, 
  handleValidationErrors, 
  uploadToCloudinary
);

export default router;
