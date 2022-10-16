const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    user: '5a422b3a1b54a676234d17f8',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    user: '5a422b3a1b54a676234d17f8',
    likes: 5,
    __v: 0
  }]

const helperblogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '5a422b3a1b54a676234d17f8',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '5a422b3a1b54a676234d17f8',
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '5a422b3a1b54a676234d17f8',
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '5a422b3a1b54a676234d17f8',
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: '5a422b3a1b54a676234d17f8',
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '5a422b3a1b54a676234d17f8',
    __v: 0
  }  
]

const properPost = {
  _id: '5a422b3a1b54a676234d17f9',
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  user: '5a422b3a1b54a676234d17f8',
  likes: 12,
  __v: 0
}

const noLikes = {
  _id: '5a422b3a1b54a676234d17f9',
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  user: '5a422b3a1b54a676234d17f8',
  __v: 0  
}

const noTitle = {
  _id: '5a422b3a1b54a676234d17f9',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12,
  user: '5a422b3a1b54a676234d17f8',
  __v: 0 
}

const noUrl = {
  _id: '5a422b3a1b54a676234d17f9',
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  likes: 12,
  user: '5a422b3a1b54a676234d17f8',
  __v: 0 
}

const user1 = {
  _id: '5a422b3a1b54a676234d17f8',
  __v: 0,
  username: 'lepanderus',
  name: 'Leo Alho',
  passwordHash: '$2a$10$UGhbHoE2FZqMvpXzAciXf.rYYTqy.ejYH/agHIFRz6XbpQgjFtVPO' 
}

const user2 = {
  username: 'toto',
  name: 'Torbjörn Alho',
  password: 'Toto1234'
}

const user3 = {
  username: 'lepanderus',
  name: 'Arno Alho',
  password: 'azx007azx007'
}

const shortUsername = {
  username: 'le',
  name: 'Arno Alho',
  password: 'azx007azx007'
}

const shortPswd = {
  username: 'lep',
  name: 'Arno Alho',
  password: 'az'
}

module.exports = {initialBlogs, helperblogs, properPost, noLikes, noTitle, noUrl, user1, user2, user3, shortUsername, shortPswd}