import express from 'express';
import { searchBookings } from '../controllers/searchController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);
router.use(isAdmin);

router.get('/bookings/search', searchBookings);

export default router;