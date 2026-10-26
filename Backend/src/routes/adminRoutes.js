import express from 'express';
import {
  getDashboardStats,
  getAllQueries,
  replyToQuery,
  deleteInactiveUsers,
  getAllUsers, // ✅ NEW
  createAnnouncement,
  getAllAnnouncementsAdmin,
  updateAnnouncementAdmin,
  deleteAnnouncementAdmin,
  updateLibraryStatus,
  addSeat,
  updateSeat,
  deleteSeat,
  getAllSectionsAdmin, // ✅ NEW
  updateSectionPrice   // ✅ NEW
} from '../controllers/adminController.js';
import { uploadSeatsCSV } from '../controllers/csvController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.use(authenticate);
router.use(isAdmin);

// Dashboard
router.get('/dashboard', getDashboardStats);

// Queries
router.get('/queries', getAllQueries);
router.post('/queries/:id/reply', replyToQuery);

// Users
router.get('/users', getAllUsers); // ✅ NEW
router.delete('/users/inactive', deleteInactiveUsers);

// Sections & Pricing
router.get('/sections', getAllSectionsAdmin); // ✅ NEW
router.put('/sections/:id/price', updateSectionPrice); // ✅ NEW

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