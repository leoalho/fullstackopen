const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  let BlogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  let promiseArray = BlogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe( 'GET', ()=>{
  test('request is working', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('there are two notes', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
  })

  test('proper id key', async ()=>{
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe( 'POST', ()=> {
  test('request is working', async () => {
    await api
      .post('/api/blogs')
      .send(helper.properPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(3)
  })

  test('no likes value get set to 0', async () => {
    const response = await api.post('/api/blogs').send(helper.noLikes)
    expect(response.body.likes).toBe(0)
  })

  test('should throw badrequest error when no title is given', async () => {
    await api.post('/api/blogs').send(helper.noTitle).expect(400)
  })

  test('should throw badrequest error when no url is given', async () => {
    await api.post('/api/blogs').send(helper.noUrl).expect(400)
  })

})


afterAll(() => {
  mongoose.connection.close()
})