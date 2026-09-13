import sequelize from '../config/database.js';
import User from './User.js';
import LibrarySection from './LibrarySection.js';
import LibraryStatus from './LibraryStatus.js';
import Announcement from './Announcement.js';
import Seat from './Seat.js';
import Booking from './Booking.js';
import BookingItem from './BookingItem.js';

// ============================================================
// ASSOCIATIONS
// ============================================================

// User (Admin) → Announcements
User.hasMany(Announcement, { foreignKey: 'admin_id' });
Announcement.belongsTo(User, { foreignKey: 'admin_id' });

// User (Admin) → LibraryStatus
User.hasMany(LibraryStatus, { foreignKey: 'updated_by' });
LibraryStatus.belongsTo(User, { foreignKey: 'updated_by' });

// LibrarySection → Seats
LibrarySection.hasMany(Seat, { foreignKey: 'section_id' });
Seat.belongsTo(LibrarySection, { foreignKey: 'section_id' });

// User → Bookings
User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

// Booking → BookingItems
Booking.hasMany(BookingItem, { foreignKey: 'booking_id' });
BookingItem.belongsTo(Booking, { foreignKey: 'booking_id' });

// Seat → BookingItems
Seat.hasMany(BookingItem, { foreignKey: 'seat_id' });
BookingItem.belongsTo(Seat, { foreignKey: 'seat_id' });

// ============================================================
// EXPORTS
// ============================================================

export {
  sequelize,
  User,
  LibrarySection,
  LibraryStatus,
  Announcement,
  Seat,
  Booking,
  BookingItem
};