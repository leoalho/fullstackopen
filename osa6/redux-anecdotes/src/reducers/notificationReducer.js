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

let timeoutId = null

export const setNotification = (msg, length) => {
  return dispatch => {

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    dispatch(notification(msg))
    timeoutId = setTimeout(() => {
      dispatch(notification(null))
    }, length*1000)
  }
}

export const { notification } = anecdoteSlice.actions
export default anecdoteSlice.reducer