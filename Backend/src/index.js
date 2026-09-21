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
const swaggerFile = require('./swagger-output.json');

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
// ROOT ROUTE — Redirect to Swagger Docs
// ═══════════════════════════════════════════════════════════
app.get('/', (req, res) => {
  res.redirect('/api-docs/');
});

// ═══════════════════════════════════════════════════════════
// Swagger Documentation
// ═══════════════════════════════════════════════════════════
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

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

    // Tables already exist on Neon — do NOT alter
    // await sequelize.sync({ alter: true });

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