const  { Model, DataTypes } = require('sequelize')
const{ sequelize } = require ('../utils/db.js')

class Event extends Model {}

Event.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'event'
})


module.exports = Event