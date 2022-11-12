import { createSlice } from "@reduxjs/toolkit";

import userService from "../services/users";

const blogSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export const { setUsers } = blogSlice.actions;
export default blogSlice.reducer;
