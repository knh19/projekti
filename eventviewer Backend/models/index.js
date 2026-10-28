const Event = require('./event')
const Registration = require('./registration')
const User = require('./user')

User.hasMany(Registration)
Event.hasMany(Registration)
Registration.belongsTo(User)
Registration.belongsTo(Event)

User.sync({ alter: true })
Event.sync({ alter: true })
Registration.sync({ alter: true })

module.exports = {User, Event, Registration}