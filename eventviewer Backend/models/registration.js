const {Model, DataTypes} = require('sequelize')
const {sequelize} = require('../utils/db')

class Registration extends Model {}

Registration.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true

    }
  }, {
    sequelize,
    underscored: true,
    modelName: 'registration'
    
  }
)

module.exports = Registration