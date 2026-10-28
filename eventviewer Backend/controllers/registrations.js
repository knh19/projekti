const registrationRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const {SECRET} = require('../utils/config')
const {User} = require('../models/')
const {Registration} = require('../models/')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


registrationRouter.post('/', (request, response) => {

  const decodedtoken = jwt.verify(getTokenFrom(request), SECRET)
  const user = User.findByPk(decodedtoken.id)
  if (!user){
      return response.status(401).send({error: 'käyttäjä ei löydy'})
  }


const {eventId} = request.body
const event = Event.findByPk(eventId)
if (!event){
  return response.status(400).send({error: 'tapahtuma ei löydy'})
}


})

module.exports = registrationRouter 