import express from 'express';
import { getActiveAnnouncements } from '../controllers/announcementController.js';

const router = express.Router();

router.get('/', getActiveAnnouncements);

export default router;