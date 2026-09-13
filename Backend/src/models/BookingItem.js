import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const BookingItem = sequelize.define('BookingItem', {
  booking_item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  booking_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  seat_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  occupant_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  is_checked_in: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'booking_items',
  timestamps: true,
  underscored: true
});

export default BookingItem;