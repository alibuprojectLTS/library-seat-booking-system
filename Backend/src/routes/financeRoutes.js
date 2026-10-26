import express from 'express';
import { getFinancialReport, processRefund } from '../controllers/financeController.js';
import { authenticate, isFinance } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);
router.use(isFinance);

router.get('/reports', getFinancialReport);
router.post('/refund', processRefund);

export default router;