import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    await addBlog({ author, title, url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return(
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
      <button id="create-button" type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}
export default BlogForm