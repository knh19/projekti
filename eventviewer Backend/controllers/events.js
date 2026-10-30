const eventRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const { Event, User, Registration } = require('../models/')

eventRouter.get('/', async (request, response) => {
  const events = await Event.findAll()
  response.json(events)
})

eventRouter.post('/', async (request, response) => {
  const event = await Event.create(request.body)
  response.json(event)
})

eventRouter.delete('/:id', async (request, response) => {
  try {
    const token = request.get('authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, SECRET)
    const user = await User.findByPk(decoded.id)

    if (!user || !user.isAdmin) {
      return response.status(403).json({ error: 'Vain ylläpitäjä' })
    }

    await Registration.destroy({ where: { eventId: request.params.id } })
    await Event.destroy({ where: { id: request.params.id } })
    response.status(204).end()
  } catch (error) {
    response.status(401).json({ error: 'Kirjaudu uudelleen' })
  }
})

module.exports = eventRouter