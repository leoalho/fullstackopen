import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: null,
  reducers: {
    notification(state, action) {
      return action.payload;
    },
  },
});

let timeoutId = null;

export const createNotification = (msg) => {
  return (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    dispatch(notification(msg));
    timeoutId = setTimeout(() => {
      dispatch(notification(null));
    }, 3000);
  };
};

export const { notification } = notificationSlice.actions;
export default notificationSlice.reducer;
