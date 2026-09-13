import express from 'express';
import { getSections, getSeatsBySection } from '../controllers/seatController.js';

const router = express.Router();

router.get('/sections', getSections);
router.get('/sections/:id/seats', getSeatsBySection);

export default router;