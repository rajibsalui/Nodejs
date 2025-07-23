import axios from 'axios';
import logger from '../utils/logger.js';
import { asyncHandler } from '../middlewares/errorHandler.js';

// Weather API integration (using OpenWeatherMap as example)
export const getWeather = asyncHandler(async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      message: 'Weather API key not configured'
    });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const weatherData = {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      timestamp: new Date()
    };

    logger.info(`Weather data retrieved for ${city}`);

    res.status(200).json({
      success: true,
      message: 'Weather data retrieved successfully',
      data: weatherData
    });
  } catch (error) {
    logger.error(`Weather API error: ${error.message}`);
    
    if (error.response?.status === 404) {
      return res.status(404).json({
        success: false,
        message: 'City not found'
      });
    }
    
    throw new Error('Unable to fetch weather data');
  }
});

// News API integration (using NewsAPI as example)
export const getNews = asyncHandler(async (req, res) => {
  const { category = 'general', country = 'us' } = req.query;
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      message: 'News API key not configured'
    });
  }

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`
    );

    const articles = response.data.articles.slice(0, 10).map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      source: article.source.name
    }));

    logger.info(`News articles retrieved for category: ${category}, country: ${country}`);

    res.status(200).json({
      success: true,
      message: 'News articles retrieved successfully',
      data: {
        articles,
        totalResults: response.data.totalResults,
        category,
        country
      }
    });
  } catch (error) {
    logger.error(`News API error: ${error.message}`);
    throw new Error('Unable to fetch news data');
  }
});
