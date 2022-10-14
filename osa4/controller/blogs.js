const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
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
  try{
    const result = await blog.save()
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