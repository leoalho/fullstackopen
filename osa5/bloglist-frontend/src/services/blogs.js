import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {  token = `bearer ${newToken}`}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
   headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateLikes = async blog => {
  const url = `${baseUrl}/${blog.id}`
  console.log(url)
  const newBlog = {title: blog.title, author: blog.author, url: blog.url, likes: blog.likes+1}
  await axios.put(url, newBlog)
}

export default {getAll, setToken, create, updateLikes}