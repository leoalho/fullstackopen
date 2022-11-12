import { useSelector, useDispatch } from "react-redux";

import Blog from "./Blog";
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

  const addLike = async (blog) => {
    try {
      dispatch(voter(blog));
      dispatch(createNotification("Updated likes"));
    } catch (exception) {
      dispatch(createNotification("updating likes unsuccesfull"));
    }
  };

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      try {
        dispatch(deleter(blog));
        dispatch(createNotification(`removed ${blog.title}`));
      } catch (exception) {
        dispatch(createNotification("Problem removing post")); //alert
      }
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <Togglable buttonLabel="new post">
        <BlogForm addBlog={addBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLike}
          deleteButton={removeBlog}
        />
      ))}
    </div>
  );
};

export default Home;
