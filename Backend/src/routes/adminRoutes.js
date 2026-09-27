import express from 'express';
import {
  getDashboardStats,
  getAllQueries,
  replyToQuery,
  deleteInactiveUsers,
  createAnnouncement,
  getAllAnnouncementsAdmin,
  updateAnnouncementAdmin,
  deleteAnnouncementAdmin,
  updateLibraryStatus,
  addSeat,
  updateSeat,
  deleteSeat
} from '../controllers/adminController.js';
import { uploadSeatsCSV } from '../controllers/csvController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// All admin routes require authentication + admin role
router.use(authenticate);
router.use(isAdmin);

// Dashboard
router.get('/dashboard', getDashboardStats);

// Queries
router.get('/queries', getAllQueries);
router.post('/queries/:id/reply', replyToQuery);

// Users
router.delete('/users/inactive', deleteInactiveUsers);

// Announcements
router.get('/announcements', getAllAnnouncementsAdmin);
router.post('/announcements', createAnnouncement);
router.put('/announcements/:id', updateAnnouncementAdmin);
router.delete('/announcements/:id', deleteAnnouncementAdmin);

// Library Status
router.put('/status', updateLibraryStatus);

// Seats - Manual
router.post('/seats', addSeat);
router.put('/seats/:id', updateSeat);
router.delete('/seats/:id', deleteSeat);

// Seats - CSV
router.post('/seats/csv', upload.single('file'), uploadSeatsCSV);

export default router;