const { db, DataTypes } = require('../utils/database.util');

const User = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'normal',
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
    allowNull: false,
  },
});

module.exports = { User };
