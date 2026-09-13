import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const LibraryStatus = sequelize.define('LibraryStatus', {
  status_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  current_state: {
    type: DataTypes.STRING(20),
    defaultValue: 'open',
    validate: { isIn: [['open', 'full', 'closed', 'maintenance']] }
  },
  capacity_used: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  capacity_total: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  open_hours: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'library_status',
  timestamps: true,
  underscored: true
});

export default LibraryStatus;