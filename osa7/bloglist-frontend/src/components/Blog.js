import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { voter, deleter, commenter } from "../reducers/blogReducer";
import { createNotification } from "../reducers/notificationReducer";

const Blog = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);
  const id = useParams().id;
  const blog = blogs.find((n) => n.id === id);
  const [removeButton, setRemovebutton] = useState("inline");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (
      blog &&
      window.localStorage.getItem("loggedUser") &&
      blog.user.username === window.localStorage.getItem("loggedUser").username
    ) {
      setRemovebutton("inline");
    }
  }, []);

  if (!blog) {
    return null;
  }

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

  const addComment = async (event) => {
    event.preventDefault();
    dispatch(commenter(comment, id));
    setComment("");
    dispatch(createNotification("Comment added"));
  };

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      {blog.url}
      <br />
      {blog.likes} likes
      <Button
        variant="outline-primary"
        onClick={() => {
          addLike(blog);
        }}
      >
        {" "}
        Like{" "}
      </Button>
      <br />
      Added by {blog.user.name}
      <br />
      <Button
        variant="outline-primary"
        onClick={() => {
          removeBlog(blog);
        }}
        style={style}
      >
        {" "}
        Remove{" "}
      </Button>
      <h2>Comments</h2>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button variant="outline-primary" type="submit">
          add comment
        </Button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
