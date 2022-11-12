import { useSelector, useDispatch } from "react-redux";

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

import { newBlog, voter, deleter } from "../reducers/blogReducer";
import { createNotification } from "../reducers/notificationReducer";

const Home = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const addBlog = async (blogObject) => {
    try {
      dispatch(newBlog(blogObject));
      dispatch(
        createNotification(`${blogObject.title} by ${blogObject.author} added`)
      );
    } catch (exception) {
      dispatch(createNotification("Adding of blogpost unsuccesfull")); //alert
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <h2>create new</h2>
      <Togglable buttonLabel="new post">
        <BlogForm addBlog={addBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <div style={blogStyle}>
          <a href={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Home;
