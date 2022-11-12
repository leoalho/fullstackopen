var _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  let favourite = blogs[0]
  for (let i=0; i<blogs.length; i++){
    if (blogs[i].likes>favourite.likes){
      favourite = blogs[i]
    }
  }
  return favourite
}

const mostBlogs = (blogs) => {
  const byWriter = _.groupBy(blogs, 'author')
  const keys = Object.keys(byWriter)
  var bestAuthor = {'author': '', 'blogs': 0}
  keys.forEach((key)=>{
    if (byWriter[key].length>bestAuthor['blogs']){
      bestAuthor['author'] = key
      bestAuthor['blogs'] = byWriter[key].length
    }
  })
  return bestAuthor
}

const mostLikes = (blogs) => {
  const byWriter = _.groupBy(blogs, 'author')
  const keys = Object.keys(byWriter)
  var author = {'author': '', 'likes': 0}
  keys.forEach((key) => {
    const sum = byWriter[key].reduce((sum, blog) => sum + blog.likes, 0)
    if (sum > author['likes']){
      author['author'] = key
      author['likes'] = sum
    }
  })
  return author
}

module.exports = {dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes}