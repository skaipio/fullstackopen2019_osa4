const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})
    return response.json(users).end()
  } catch (error) {
    next(error)
  }
})

userRouter.post('/', async (request, response, next) => {
  const body = request.body

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      ...body,
      passwordHash
    })

    const newUser = await user.save()
    return response.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
})

module.exports = userRouter