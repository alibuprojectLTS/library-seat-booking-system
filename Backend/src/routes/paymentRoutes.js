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

// ✅ Add Swagger comment for body
router.post('/initiate',
  /*
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              bookingId: { type: "integer", example: 1 }
            },
            required: ["bookingId"]
          }
        }
      }
    }
  */
  initiatePayment
);

router.get('/verify/:txRef', verifyPayment);
router.get('/history', getPaymentHistory);

export default router;