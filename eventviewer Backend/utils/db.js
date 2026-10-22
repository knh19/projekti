const Sequelize = require('sequelize')
const logger = require('./logger')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'test' ? false : console.log
})

const connectToDatabase = () => {
  try {
    sequelize.authenticate()
      .then(() => {
        logger.info('Connected to the database')
      })
  } catch {
    logger.error('Failed to connect to the database')
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }