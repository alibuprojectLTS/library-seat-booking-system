import express from 'express';
import { checkIn, checkOut } from '../controllers/checkinController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);
router.use(isAdmin);

router.post('/checkin', checkIn);
router.post('/checkout', checkOut);

export default router;