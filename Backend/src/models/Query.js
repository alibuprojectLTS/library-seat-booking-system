import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Query = sequelize.define('Query', {
  query_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  subject: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'pending',
    validate: { isIn: [['pending', 'in_progress', 'resolved', 'closed']] }
  },
  priority: {
    type: DataTypes.STRING(20),
    defaultValue: 'normal',
    validate: { isIn: [['low', 'normal', 'high', 'urgent']] }
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: { isIn: [['booking', 'payment', 'seat', 'general', 'technical']] }
  }
}, {
  tableName: 'queries',
  timestamps: true,
  underscored: true
});

export default Query;