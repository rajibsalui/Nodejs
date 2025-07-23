# Advanced Express.js Application - Week 8

This is an advanced Express.js application with enhanced features including file upload, comprehensive error handling, third-party API integrations, and robust security measures.

## Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- User registration and login
- Protected routes with middleware
- Input validation and sanitization

### 📁 File Upload System
- Local file storage with Multer
- Cloud storage integration with Cloudinary
- Multiple file upload support
- File type validation and size limits
- File management (list, delete)

### 🌐 Third-Party API Integrations
- **Weather API**: Get current weather for any city
- **News API**: Fetch latest news articles by category/country
- **Random Jokes**: Get random programming jokes
- **Currency Exchange**: Real-time exchange rates
- **Cat Facts**: Random cat facts
- **QR Code Generator**: Generate QR codes for any text

### 🛡️ Security Features
- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Input validation with express-validator
- Secure file upload with type validation

### 📊 Logging & Monitoring
- Winston logger with multiple transports
- Morgan HTTP request logging
- Error tracking and logging
- Structured logging with timestamps

### 🚨 Error Handling
- Global error handler middleware
- Custom error classes
- Async error handling wrapper
- Graceful server shutdown
- Unhandled rejection/exception handling

## Installation

1. **Clone and navigate to the project:**
   ```bash
   cd "week 8"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   - Copy `.env.example` to `.env`
   - Fill in your environment variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/advanced_express_app
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   NODE_ENV=development
   
   # Optional API Keys
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   OPENWEATHER_API_KEY=your_openweather_api_key
   NEWS_API_KEY=your_news_api_key
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user

### User Routes (`/api/users`)
- User management endpoints (existing)

### File Upload Routes (`/api/files`)
- `POST /upload` - Upload single file to local storage
- `POST /upload-cloud` - Upload single file to Cloudinary
- `POST /upload-multiple` - Upload multiple files (max 5)
- `GET /` - List uploaded files
- `DELETE /:filename` - Delete uploaded file

### External API Routes (`/api/external`)
- `GET /weather/:city` - Get weather for city
- `GET /news?category=general&country=us` - Get news articles
- `GET /joke` - Get random joke
- `GET /exchange/:baseCurrency` - Get exchange rates
- `GET /catfact` - Get random cat fact
- `POST /qrcode` - Generate QR code

### System Routes
- `GET /health` - Health check endpoint

## Usage Examples

### File Upload
```bash
# Upload single file
curl -X POST -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@path/to/your/file.jpg" \
  -F "description=Profile picture" \
  http://localhost:5000/api/files/upload

# Upload to Cloudinary
curl -X POST -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@path/to/your/file.jpg" \
  http://localhost:5000/api/files/upload-cloud
```

### Third-Party API Examples
```bash
# Get weather
curl http://localhost:5000/api/external/weather/London

# Get news
curl "http://localhost:5000/api/external/news?category=technology&country=us"

# Generate QR code
curl -X POST -H "Content-Type: application/json" \
  -d '{"text":"Hello World","size":"300x300"}' \
  http://localhost:5000/api/external/qrcode
```

### Authentication
```bash
# Register
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"SecurePass123"}' \
  http://localhost:5000/api/auth/register

# Login
curl -X POST -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"SecurePass123"}' \
  http://localhost:5000/api/auth/login
```

## Project Structure

```
week 8/
├── config/
│   ├── cloudinary.js      # Cloudinary configuration
│   └── multer.js          # File upload configuration
├── controllers/
│   ├── apiController.js   # Third-party API integrations
│   ├── authController.js  # Authentication logic
│   ├── fileController.js  # File upload logic
│   └── userController.js  # User management
├── middlewares/
│   ├── auth.js           # Authentication middleware
│   ├── errorHandler.js   # Global error handling
│   └── validation.js     # Input validation rules
├── models/
│   └── users.js          # User model
├── routes/
│   ├── api.js            # External API routes
│   ├── auth.js           # Authentication routes
│   ├── files.js          # File upload routes
│   └── users.js          # User routes
├── utils/
│   └── logger.js         # Winston logger configuration
├── uploads/              # Local file storage
├── logs/                 # Application logs
├── .env.example          # Environment variables template
├── package.json
└── server.js             # Main application file
```

## Error Handling

The application includes comprehensive error handling:

- **Validation Errors**: Input validation with detailed error messages
- **Authentication Errors**: JWT token validation and authorization
- **File Upload Errors**: File type, size, and upload validation
- **Database Errors**: MongoDB connection and query error handling
- **API Errors**: Third-party API error handling with fallbacks
- **Server Errors**: Graceful shutdown and uncaught exception handling

## Logging

All application events are logged using Winston:

- **Development**: Console output with colors
- **Production**: File-based logging with rotation
- **Error Logs**: Separate error log file
- **Request Logs**: HTTP request logging with Morgan

## Security Features

- **Helmet**: Security headers protection
- **CORS**: Cross-origin resource sharing configuration
- **Rate Limiting**: Request rate limiting per IP
- **Input Validation**: Comprehensive input sanitization
- **File Upload Security**: File type and size validation
- **JWT**: Secure token-based authentication

## Dependencies

### Core Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing

### Security
- `helmet` - Security headers
- `cors` - CORS handling
- `express-rate-limit` - Rate limiting
- `express-validator` - Input validation

### File Upload
- `multer` - File upload handling
- `cloudinary` - Cloud storage

### Logging & Monitoring
- `winston` - Logging
- `morgan` - HTTP request logging

### External APIs
- `axios` - HTTP client for API calls

## Getting API Keys

### Cloudinary (File Upload)
1. Sign up at [cloudinary.com](https://cloudinary.com/)
2. Get your Cloud Name, API Key, and API Secret from the dashboard

### OpenWeatherMap (Weather API)
1. Sign up at [openweathermap.org](https://openweathermap.org/api)
2. Get your free API key

### NewsAPI (News)
1. Sign up at [newsapi.org](https://newsapi.org/)
2. Get your free API key

## License

This project is for educational purposes.
