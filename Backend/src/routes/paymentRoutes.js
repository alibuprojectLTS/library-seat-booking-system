import express from 'express';
import {
  initiatePayment,
  verifyPayment,
  webhookHandler,
  getPaymentHistory
} from '../controllers/paymentController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public webhook (no auth)
router.post('/webhook', webhookHandler);
router.get('/webhook', webhookHandler);

// Protected routes
router.use(authenticate);

router.post('/initiate', initiatePayment);
router.get('/verify/:txRef', verifyPayment);
router.get('/history', getPaymentHistory);

export default router;