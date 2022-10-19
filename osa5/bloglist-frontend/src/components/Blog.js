import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, deleteButton }) => {
  const [verbose, setVerbose] = useState(false)
  const [removeButton, setRemovebutton] = useState('inline')
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggleVerbose = () => {
    setVerbose(!verbose)
  }

  useEffect(() => {

    if (window.localStorage.getItem('loggedUser') && blog.user.username === window.localStorage.getItem('loggedUser').username){
      setRemovebutton('inline')
    }
  }, [])

  const style = {
    display: removeButton
  }

  if (verbose){
    return(
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleVerbose}>Hide</button><br/>
        {blog.url}<br/>
        likes {blog.likes} <button onClick={() => {addLike(blog)}}>Like</button><br/>
        {blog.user.name}<br/>
        <button onClick={() => {deleteButton(blog)}} style={style}>Remove</button>
      </div>
    )
  }
  return(
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVerbose}>View</button>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteButton: PropTypes.func.isRequired
}
export default Blog