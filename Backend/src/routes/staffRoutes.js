import express from 'express';
import { processPOSBooking, checkInTicket } from '../controllers/staffController.js';
import { getAllQueries, replyToQuery } from '../controllers/adminController.js'; // ✅ Imported Query logic
import { authenticate, isStaff } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);
router.use(isStaff);

// POS Cash Ticket
router.post('/pos-booking', processPOSBooking);

// Check-In
router.post('/checkin', checkInTicket);

// ✅ Support Queries (Staff can view and reply)
router.get('/queries', getAllQueries);
router.post('/queries/:id/reply', replyToQuery);

export default router;