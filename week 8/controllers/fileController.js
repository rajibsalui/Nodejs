import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import path from 'path';
import logger from '../utils/logger.js';
import { asyncHandler } from '../middlewares/errorHandler.js';

// Upload file to Cloudinary
export const uploadToCloudinary = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Please upload a file'
    });
  }

  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'uploads',
      resource_type: 'auto', // Automatically detect file type
      use_filename: true,
      unique_filename: false,
    });

    // Delete local file after successful upload to Cloudinary
    fs.unlinkSync(req.file.path);

    logger.info(`File uploaded to Cloudinary: ${req.file.originalname} by user ${req.user?.id || 'anonymous'}`);

    res.status(200).json({
      success: true,
      message: 'File uploaded to Cloudinary successfully',
      data: {
        public_id: result.public_id,
        url: result.secure_url,
        format: result.format,
        resource_type: result.resource_type,
        bytes: result.bytes,
        originalname: req.file.originalname,
        description: req.body.description || null,
        uploadedAt: new Date()
      }
    });
  } catch (error) {
    // Delete local file if Cloudinary upload fails
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    logger.error(`Cloudinary upload failed: ${error.message}`);
    throw new Error('File upload to Cloudinary failed');
  }
});

