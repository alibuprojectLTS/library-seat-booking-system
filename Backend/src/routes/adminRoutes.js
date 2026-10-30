import express from 'express';
import {
  getDashboardStats,
  cancelBookingAdmin,
  getAllQueries,
  replyToQuery,
  deleteInactiveUsers,
  getAllUsers,
  toggleUserStatus, // ✅ Imported
  createAnnouncement,
  getAllAnnouncementsAdmin,
  updateAnnouncementAdmin,
  deleteAnnouncementAdmin,
  updateLibraryStatus,
  addSeat,
  updateSeat,
  deleteSeat,
  getAllSectionsAdmin,
  updateSectionPrice
} from '../controllers/adminController.js';
import { uploadSeatsCSV } from '../controllers/csvController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.use(authenticate);
router.use(isAdmin);

// Dashboard
router.get('/dashboard', getDashboardStats);

// Bookings (Admin Override)
router.delete('/bookings/:id/cancel', cancelBookingAdmin);

// Queries
router.get('/queries', getAllQueries);
router.post('/queries/:id/reply', replyToQuery);

// Users
router.get('/users', getAllUsers);
router.delete('/users/inactive', deleteInactiveUsers);
router.put('/users/:id/toggle', toggleUserStatus); // ✅ Added Route

// Sections & Pricing
router.get('/sections', getAllSectionsAdmin);
router.put('/sections/:id/price', updateSectionPrice);

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