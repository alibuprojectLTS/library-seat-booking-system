import express from 'express';
import { getSections } from '../controllers/seatController.js';

const router = express.Router();

router.get('/sections', getSections);

// Seats - Phase 3
// router.get('/sections/:id/seats', getSeatsBySection);

export default router;