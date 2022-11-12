import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Users from "./components/Users";
import User from "./components/User.js";

import { createNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(newUser));
    }
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  const handleLogout = () => {
    dispatch(setUser(null));
    window.localStorage.removeItem("loggedUser");
    dispatch(createNotification("Logged out"));
  };

  if (user === null) {
    return <LoginForm />;
  }

  return (
    <Router>
      <div>
        <Link to="/">blogs </Link>
        <Link to="/users">users</Link>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </div>

      <Notification />
      <h2>Blog app</h2>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </Router>
  );
};

export default App;
