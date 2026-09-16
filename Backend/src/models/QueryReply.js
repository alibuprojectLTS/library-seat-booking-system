import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const QueryReply = sequelize.define('QueryReply', {
  reply_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  query_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sender_type: {
    type: DataTypes.STRING(20),
    defaultValue: 'user',
    validate: { isIn: [['user', 'admin']] }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  is_internal: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'query_replies',
  timestamps: true,
  underscored: true
});

export default QueryReply;