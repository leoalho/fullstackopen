import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1));
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);

      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      notify(`Logged in as ${user.name}`);
    } catch (exception) {
      notify("Wrong credentials", "alert");
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
    notify("Logged out");
  };

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject);
      notify(`${newBlog.title} by ${newBlog.author} added`);
      const blogs = await blogService.getAll();
      blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1));
      setBlogs(blogs);
    } catch (exception) {
      notify("Adding of blogpost unsuccesfull", "alert");
    }
  };

  const addLike = async (blog) => {
    try {
      await blogService.updateLikes(blog);
      notify("Updated likes");
      const blogs = await blogService.getAll();
      blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1));
      setBlogs(blogs);
    } catch (exception) {
      notify("updating likes unsuccesfull", "alert");
    }
  };

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove ${blog.title}?`)) {
      try {
        await blogService.deletePost(blog);
        notify(`removed ${blog.title}`);
        const blogs = await blogService.getAll();
        blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1));
        setBlogs(blogs);
      } catch (exception) {
        notify("Problem removing post", "alert");
      }
    }
  };

  const notify = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const loginForm = () => (
    <div>
      <Notification notification={notification} />
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            value={username}
            id="username"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={password}
            id="password"
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  if (user === null) {
    return loginForm();
  }

  return (
    <div>
      <Notification notification={notification} />
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
    </div>
  );
};

export default App;
