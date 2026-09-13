import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Seat = sequelize.define('Seat', {
  seat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  section_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  seat_label: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  row_number: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  column_number: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  seat_status: {
    type: DataTypes.STRING(20),
    defaultValue: 'available',
    validate: { isIn: [['available', 'booked', 'deactivated']] }
  }
}, {
  tableName: 'seats',
  timestamps: true,
  underscored: true
});

export default Seat;