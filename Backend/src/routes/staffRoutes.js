import express from 'express';
import { processPOSBooking, checkInTicket } from '../controllers/staffController.js';
import { authenticate, isStaff } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);
router.use(isStaff);

// POS Cash Ticket
router.post('/pos-booking', processPOSBooking);

// Check-In
router.post('/checkin', checkInTicket);

export default router;