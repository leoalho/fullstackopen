const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})
  
blogRouter.get('/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
  }catch (exception){
    next(exception)
  }
})

blogRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const {title, author, url, likes} = request.body
  
  if (!request.token){
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id 
  })
  try{
    const result = await blog.save()
    user.blogs = user.blogs.concat(result.id)
    await user.save()
    response.status(201).json(result)
  }catch (exception){
    next(exception)
  }
})

blogRouter.put('/:id', async(request, response, next) => {
  try{
    const updateBlog = await Blog.findByIdAndUpdate(request.params.id,
      request.body,
      { new: true, runValidators: true, context: 'query' })
    response.json(updateBlog)
    
  }catch (error){
    next(error)
  }
})

blogRouter.delete('/:id',middleware.userExtractor, async (request, response, next) => {
  if (!request.token){
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })  }
  
  try{
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)
    
    if ( blog.user.toString() === user._id.toString() ){
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }else{
      response.status(403).end()
    }
    
  }catch (error){
    next(error)
  }
})



module.exports = blogRouter