const eventRouter = require('express').Router()
const { response } = require('express')
const {Event} = require('../models/')

eventRouter.get('/', async(request,  response)=>{
  const event = await Event.findAll({
  })
response.json(event)
})

eventRouter.post('/', async(request, response)=> {
  const event = await Event.create(request.body)
response.json(event)
})

module.exports = eventRouter