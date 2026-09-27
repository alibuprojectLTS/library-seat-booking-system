import express from 'express';
import {
  submitQuery,
  getMyQueries,
  deleteQuery
} from '../controllers/queryController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.post('/', submitQuery);
router.get('/my', getMyQueries);
router.delete('/:id', deleteQuery);

export default router;