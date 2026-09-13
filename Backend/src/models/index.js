import sequelize from '../config/database.js';
import User from './User.js';
import LibrarySection from './LibrarySection.js';
import LibraryStatus from './LibraryStatus.js';
import Announcement from './Announcement.js';

// ============================================================
// ASSOCIATIONS
// ============================================================

// User (Admin) → Announcements
User.hasMany(Announcement, { foreignKey: 'admin_id' });
Announcement.belongsTo(User, { foreignKey: 'admin_id' });

// User (Admin) → LibraryStatus
User.hasMany(LibraryStatus, { foreignKey: 'updated_by' });
LibraryStatus.belongsTo(User, { foreignKey: 'updated_by' });

// LibrarySection → (Seats will be added in Phase 3)
// LibrarySection.hasMany(Seat, { foreignKey: 'section_id' });

// ============================================================
// EXPORTS
// ============================================================

export {
  sequelize,
  User,
  LibrarySection,
  LibraryStatus,
  Announcement
};