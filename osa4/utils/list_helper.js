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
  return 0
}

module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs
}