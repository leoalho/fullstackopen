import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
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
      <Notification />
      <div>
        <Link to="/">home </Link>
        <Link to="/users">users</Link>
      </div>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </p>

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </Router>
  );
};

export default App;
