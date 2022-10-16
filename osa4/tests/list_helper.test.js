const {dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes} = require('../utils/list_helper')
const {helperblogs} = require('./test_helper')
test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
  
    const result = totalLikes(blogs)
    expect(result).toBe(0)
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = totalLikes(helperblogs)
    expect(result).toBe(36)
  })
})

describe('favourite blog', () => {
  test('in a bigger list is right', () => {
    const favourite =   {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      user: '5a422b3a1b54a676234d17f8',
      __v: 0
    }
    const result = favouriteBlog(helperblogs)
    expect(result).toEqual(favourite)
  })
})

describe('most blog posts', () => {
  test('in a bigger list is right', () => {
    const mostPosts = {
      author: 'Robert C. Martin',
      blogs: 3
    }

    const result = mostBlogs(helperblogs)
    expect(result).toEqual(mostPosts)
  })
})

describe('most liked author', () => {
  test('in a bigger list is right', () => {
    const mostLiked = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }

    const result = mostLikes(helperblogs)
    expect(result).toEqual(mostLiked)
  })
})
