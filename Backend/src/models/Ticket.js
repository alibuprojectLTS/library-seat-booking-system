import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Ticket = sequelize.define('Ticket', {
  ticket_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  booking_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ticket_code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  valid_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  is_valid: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  qr_code_data: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // ✅ Added for staff Check-In process
  checked_in: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  checked_in_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'tickets',
  timestamps: true,
  underscored: true
});

export default Ticket;