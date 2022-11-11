import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlogs(state, action) {
      state.push(action.payload);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1));
    dispatch(setBlogs(blogs));
  };
};

export const newBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogService.create(content);
    dispatch(appendBlogs(blog));
  };
};

export const voter = (id) => {
  return async (dispatch) => {
    await blogService.updateLikes(id)
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1));
    dispatch(setBlogs(blogs));
  }
}

export const { setBlogs, appendBlogs } = blogSlice.actions;
export default blogSlice.reducer;
