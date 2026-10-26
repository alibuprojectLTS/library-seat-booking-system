
import express from 'express';
import { getFinancialReport } from '../controllers/financeController.js';
import { authenticate, isFinance } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);
router.use(isFinance);

// Get daily/weekly/monthly reports
router.get('/reports', getFinancialReport);

export default router;