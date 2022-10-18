import { useState } from 'react'

const Blog = ({blog, addLike}) => {
  const [verbose, setVerbose] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggleVerbose = () =>{
    setVerbose(!verbose)
  }
  
  if (verbose){
    return(
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVerbose}>Hide</button><br/>
      {blog.url}<br/>
      likes {blog.likes} <button onClick={() => {addLike(blog)}}>Like</button><br/>
      {blog.user.name}
    </div>  
    )
  }
  return(
  <div style={blogStyle}>
    {blog.title} {blog.author} <button onClick={toggleVerbose}>View</button>
  </div>  
)}

export default Blog