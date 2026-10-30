const registrationRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const {SECRET} = require('../utils/config')
const {User} = require('../models/')
const {Registration} = require('../models/')
const Event = require('../models/event')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


registrationRouter.post('/', async (request, response, next) => {
try{
  const decodedtoken = jwt.verify(getTokenFrom(request), SECRET)
  const user = await  User.findByPk(decodedtoken.id)
  
  if (!user){
      return response.status(401).send({error: 'käyttäjä ei löydy'})
  }


const {eventId} = request.body
const event = await Event.findByPk(eventId)
if (!event){
  return response.status(400).send({error: 'tapahtuma ei löydy'})
}

const registration = await Registration.create({
  eventId: event.id,
  userId: user.id
})

response.status(201).json(registration)
} catch (error) {
  next(error)
}

})

module.exports = registrationRouter 