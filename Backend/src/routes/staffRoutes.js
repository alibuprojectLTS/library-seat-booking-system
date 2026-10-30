import express from 'express';
import { processPOSBooking, checkInTicket } from '../controllers/staffController.js';
import { getAllQueries, replyToQuery, searchBookings } from '../controllers/adminController.js'; // ✅ Added searchBookings
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

// ✅ Staff Booking List
router.get('/bookings', searchBookings);

export default router;