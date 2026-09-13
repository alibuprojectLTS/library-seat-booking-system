import express from 'express';
import { getLibraryStatus } from '../controllers/statusController.js';

const router = express.Router();

router.get('/', getLibraryStatus);

export default router;