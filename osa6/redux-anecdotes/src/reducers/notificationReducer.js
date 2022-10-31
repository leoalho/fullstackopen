import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: null,
  reducers: {
    setNotification(state, action){
      return action.payload
    }

  }
})

export const { setNotification } = anecdoteSlice.actions
export default anecdoteSlice.reducer