import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import blogService from "./services/blogs";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";

import { createNotification } from "./reducers/notificationReducer";
import {
  initializeBlogs,
  newBlog,
  voter,
  deleter,
} from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(newUser));
      blogService.setToken(newUser.token);
    }
    dispatch(initializeBlogs());
  }, []);

  const handleLogout = () => {
    dispatch(setUser(null));
    window.localStorage.removeItem("loggedUser");
    dispatch(createNotification("Logged out"));
  };

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

  if (user === null) {
    return <LoginForm />;
  }

  return (
    <Router>
      <Notification />
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>
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
    </Router>
  );
};

export default App;
