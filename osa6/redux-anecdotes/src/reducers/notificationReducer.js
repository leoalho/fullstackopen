import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: null,
  reducers: {
    notification(state, action){
      return action.payload
    }

  }
})

export const setNotification = (msg, length) => {
  return async dispatch => {
    dispatch(notification(msg))
    setTimeout(() => {
      dispatch(notification(null))
    }, length*1000)
  }
}

export const { notification } = anecdoteSlice.actions
export default anecdoteSlice.reducer