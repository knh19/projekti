const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

router.post('/', async (req, res) => {
  try {
    const { username, password, name, isAdmin} = req.body

    if (!username || !name || !password || password.length < 8) {
      return res.status(400).json({
        error: 'Täytä kaikki kentät. Salasana vähintään 8 merkkiä.'
      })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    
    const user = await User.create({
      username,
      name,
      passwordHash,
      isAdmin,
    })
    
    res.status(201).json(user)
  } catch (error) { console.log(error)
    res.status(400).json({
      error: 'Rekisteröityminen epäonnistui'
    })
  }
})

module.exports = router