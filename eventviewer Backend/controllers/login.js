const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()

const { SECRET } = require('../utils/config')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.scope('withPasswordHash').findOne({
    where: { username: username }
  })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password || '', user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'Väärä käyttäjänimi tai salasana'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(
    userForToken,
    SECRET,
    { expiresIn: 60 * 60 }
  )

  response.status(200).json({
    token,
    username: user.username,
    name: user.name,
    isAdmin: user.isAdmin
  })
})

module.exports = loginRouter