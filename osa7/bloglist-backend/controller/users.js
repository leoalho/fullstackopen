const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})
  response.json(users)
})

userRouter.post('/', async(request, response, next) => {
  const {username, name, password}  = request.body
  if (password.length<3){
    return response.status(400).send({error: 'password too short'})
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  try{
    const user = new User({username, name, passwordHash})
    const result = await user.save()
    response.status(201).json(result)
  }catch (exception){
    next(exception)
  }
})

module.exports = userRouter