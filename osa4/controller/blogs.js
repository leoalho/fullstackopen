const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  const user = await User.findById(request.body.user)
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

blogRouter.delete('/:id', async (request, response, next) => {
  try{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }catch (error){
    next(error)
  }
})



module.exports = blogRouter