import sequelize from '../config/database.js';
import User from './User.js';
import LibrarySection from './LibrarySection.js';
import LibraryStatus from './LibraryStatus.js';
import Announcement from './Announcement.js';
import Seat from './Seat.js';
import Booking from './Booking.js';
import BookingItem from './BookingItem.js';
import Payment from './Payment.js';
import Ticket from './Ticket.js';
import Query from './Query.js';
import QueryReply from './QueryReply.js';

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

// Booking → Payment
Booking.hasOne(Payment, { foreignKey: 'booking_id' });
Payment.belongsTo(Booking, { foreignKey: 'booking_id' });

// Booking → Ticket
Booking.hasOne(Ticket, { foreignKey: 'booking_id' });
Ticket.belongsTo(Booking, { foreignKey: 'booking_id' });

// User → Queries
User.hasMany(Query, { foreignKey: 'user_id' });
Query.belongsTo(User, { foreignKey: 'user_id' });

// Admin → Queries
User.hasMany(Query, { foreignKey: 'admin_id' });
Query.belongsTo(User, { foreignKey: 'admin_id', as: 'Admin' });

// Query → QueryReplies
Query.hasMany(QueryReply, { foreignKey: 'query_id' });
QueryReply.belongsTo(Query, { foreignKey: 'query_id' });

// User → QueryReplies
User.hasMany(QueryReply, { foreignKey: 'sender_id' });
QueryReply.belongsTo(User, { foreignKey: 'sender_id' });

export {
  sequelize,
  User,
  LibrarySection,
  LibraryStatus,
  Announcement,
  Seat,
  Booking,
  BookingItem,
  Payment,
  Ticket,
  Query,
  QueryReply
};