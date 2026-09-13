import express from 'express';
import authRoutes from './authRoutes.js';
import statusRoutes from './statusRoutes.js';
import seatRoutes from './seatRoutes.js';
import announcementRoutes from './announcementRoutes.js';

const router = express.Router();

// Public routes
router.use('/auth', authRoutes);
router.use('/status', statusRoutes);
router.use('/seats', seatRoutes);
router.use('/announcements', announcementRoutes);

export default router;