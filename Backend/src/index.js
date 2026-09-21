import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { createRequire } from 'module';
import swaggerUi from 'swagger-ui-express';
import sequelize from './config/database.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger-output.json');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// ═══════════════════════════════════════════════════════════
// ROOT ROUTE — Redirect to Swagger
// ═══════════════════════════════════════════════════════════
app.get('/', (req, res) => {
  res.redirect('/api-docs/');
});

// ═══════════════════════════════════════════════════════════
// Swagger Documentation (Dynamic Host + HTTPS in Prod)
// ═══════════════════════════════════════════════════════════
app.use(
  '/api-docs',
  swaggerUi.serve,
  (req, res, next) => {
    // Clone swagger doc so we don't mutate the original
    const dynamicSwagger = { ...swaggerDocument };

    // Use the actual host from the incoming request
    dynamicSwagger.host = req.get('host');

    // Force HTTPS in production (Render, Heroku, etc.)
    const isProduction =
      process.env.NODE_ENV === 'production' ||
      req.get('host')?.includes('onrender.com') ||
      req.get('x-forwarded-proto') === 'https';

    dynamicSwagger.schemes = [isProduction ? 'https' : 'http'];

    swaggerUi.setup(dynamicSwagger)(req, res, next);
  }
);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Library Seat Booking System API',
    status: 'Running',
    version: '1.0.0'
  });
});

// Routes
app.use('/api', routes);

// Error Handler
app.use(errorHandler);

// Start Server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 http://localhost:${PORT}`);
      console.log(`📚 Swagger Docs: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error.message);
    process.exit(1);
  }
};

startServer();