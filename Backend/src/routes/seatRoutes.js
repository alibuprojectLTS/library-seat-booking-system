import express from 'express';
import {
  getSections,
  getSeatsBySection,
  getSeatStatus
} from '../controllers/seatController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/sections', getSections);

// Protected routes
router.get('/sections/:id/seats', authenticate, getSeatsBySection);
router.get('/status', authenticate, getSeatStatus);

export default router;