import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const LibrarySection = sequelize.define('LibrarySection', {
  section_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  section_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price_per_seat: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'library_sections',
  timestamps: true,
  underscored: true
});

export default LibrarySection;