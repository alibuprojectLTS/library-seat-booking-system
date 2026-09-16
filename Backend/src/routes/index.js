import express from 'express';
import authRoutes from './authRoutes.js';
import statusRoutes from './statusRoutes.js';
import seatRoutes from './seatRoutes.js';
import announcementRoutes from './announcementRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import queryRoutes from './queryRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = express.Router();

// Public routes
router.use('/auth', authRoutes);
router.use('/status', statusRoutes);
router.use('/seats', seatRoutes);
router.use('/announcements', announcementRoutes);

// Protected routes
router.use('/bookings', bookingRoutes);
router.use('/payments', paymentRoutes);
router.use('/queries', queryRoutes);

// Admin routes
router.use('/admin', adminRoutes);

export default router;