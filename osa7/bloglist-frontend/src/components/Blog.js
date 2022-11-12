import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { voter, deleter } from "../reducers/blogReducer";
import { createNotification } from "../reducers/notificationReducer";
import { useParams } from "react-router-dom";

const Blog = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const blog = blogs.find((n) => n.id === id);
  const [removeButton, setRemovebutton] = useState("inline");

  useEffect(() => {
    if (
      window.localStorage.getItem("loggedUser") &&
      blog.user.username === window.localStorage.getItem("loggedUser").username
    ) {
      setRemovebutton("inline");
    }
  }, []);

  const style = {
    display: removeButton,
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

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      {blog.url}
      <br />
      {blog.likes} likes
      <button
        onClick={() => {
          addLike(blog);
        }}
      >
        Like
      </button>
      <br />
      Added by {blog.user.name}
      <br />
      <button
        onClick={() => {
          removeBlog(blog);
        }}
        style={style}
      >
        {" "}
        Remove{" "}
      </button>
    </div>
  );
};

export default Blog;
