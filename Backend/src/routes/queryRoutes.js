import express from 'express';
import { submitQuery, getMyQueries } from '../controllers/queryController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.post('/', submitQuery);
router.get('/my', getMyQueries);

export default router;