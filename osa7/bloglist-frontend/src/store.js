import { configureStore } from "@reduxjs/toolkit";

//import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from "./reducers/notificationReducer";
//import filterReducer from './reducers/filterReducer'
import blogReducer from "./reducers/blogReducer";

export default configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    //filter: filterReducer
  },
});
