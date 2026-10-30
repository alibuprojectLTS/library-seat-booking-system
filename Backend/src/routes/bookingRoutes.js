import express from 'express';
import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  deleteBookingHistory // ✅ Imported
} from '../controllers/bookingController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.post('/', createBooking);
router.get('/my', getMyBookings);
router.get('/:id', getBookingById);
router.delete('/:id/cancel', cancelBooking);
router.delete('/:id/history', deleteBookingHistory); // ✅ Added route

export default router;