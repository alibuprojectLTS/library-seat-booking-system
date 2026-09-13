import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Announcement = sequelize.define('Announcement', {
  announcement_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  announcement_type: {
    type: DataTypes.STRING(50),
    defaultValue: 'general',
    validate: { isIn: [['general', 'urgent', 'holiday', 'maintenance', 'promotional']] }
  },
  priority: {
    type: DataTypes.STRING(20),
    defaultValue: 'normal',
    validate: { isIn: [['normal', 'high', 'urgent']] }
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  is_pinned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'announcements',
  timestamps: true,
  underscored: true
});

export default Announcement;