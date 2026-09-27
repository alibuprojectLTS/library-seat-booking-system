import express from 'express';
import { getLibraryStatus, getPublicStats } from '../controllers/statusController.js';

const router = express.Router();

router.get('/', getLibraryStatus);
router.get('/stats', getPublicStats);

export default router;