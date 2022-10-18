import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) 
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)      
      //noteService.setToken(user.token)
      }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error('wrong credentials')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({author, title, url})
      setAuthor('')
      setTitle('')
      setUrl('')
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (exception) {
      console.error(exception)
    }
  }
  const loginForm = () => (
    <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            value={username}
            id ="username"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
      </div>    
      <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={password}
            id = "password"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>     
    </div>
  )
  
  if (user === null) {
    return loginForm()
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          <label htmlFor="title">Title: </label>
          <input 
            type="text"
            value={title}
            id = "title"
            name = "title"
            onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input 
            type="text"
            value={author}
            id = "author"
            name = "author"
            onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
          <label htmlFor="url">Url: </label>
          <input 
            type="text"
            value={url}
            id = "url"
            name = "url"
            onChange={({ target }) => setUrl(target.value)}
            />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
