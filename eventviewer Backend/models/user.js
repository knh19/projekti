const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      len: {
        args: [3, 255],
        msg: 'Käyttäjänimen pitää olla vähintään 3 merkkiä'
      }
    }
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'user',
  defaultScope: {
    attributes: { exclude: ['passwordHash'] }
  },
  scopes: {
    withPasswordHash: { attributes: {} }
  }
})


module.exports = User