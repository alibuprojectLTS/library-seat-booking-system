import express from 'express';
import authRoutes from './authRoutes.js';
import statusRoutes from './statusRoutes.js';
import seatRoutes from './seatRoutes.js';
import announcementRoutes from './announcementRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import queryRoutes from './queryRoutes.js';
import adminRoutes from './adminRoutes.js';
import ticketRoutes from './ticketRoutes.js';
import checkinRoutes from './checkinRoutes.js';
import searchRoutes from './searchRoutes.js';

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
router.use('/tickets', ticketRoutes);

// Admin routes
router.use('/admin', adminRoutes);
router.use('/admin', checkinRoutes);
router.use('/admin', searchRoutes);

export default router;