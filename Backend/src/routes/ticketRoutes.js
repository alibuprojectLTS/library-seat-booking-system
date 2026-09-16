import express from 'express';
import { getMyTickets, getTicketById } from '../controllers/ticketController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/my', getMyTickets);
router.get('/:id', getTicketById);

export default router;