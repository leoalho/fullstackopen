import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

import { newBlog } from "../reducers/blogReducer";
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

  return (
    <div>
      <Togglable buttonLabel="new post">
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <Table striped hover>
        <tbody>
          {blogs.map((blog) => (
            <tr>
              <td>
                <a href={`/blogs/${blog.id}`}>{blog.title}</a>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
