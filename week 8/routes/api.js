import express from 'express';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middlewares/validation.js';
import {
  getWeather,
  getNews,
} from '../controllers/apiController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// @route   GET /api/external/weather/:city
// @desc    Get weather data for a city
// @access  Public
router.get('/weather/:city', protect, handleValidationErrors,  getWeather);

// @route   GET /api/external/news
// @desc    Get news articles
// @access  Public
router.get('/news', protect, handleValidationErrors, getNews);

export default router;
