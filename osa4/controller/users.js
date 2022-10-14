const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

userRouter.post('/', async(request, response, next) => {
  const {username, name, password}  = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({username, name, passwordHash})
  try{
    const result = await user.save()
    response.status(201).json(result)
  }catch (exception){
    next(exception)
  }
})

module.exports = userRouter