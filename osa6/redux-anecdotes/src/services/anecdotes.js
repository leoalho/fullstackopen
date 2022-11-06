import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  const newState = response.data
  newState.sort((a,b)=> b.votes-a.votes)
  return newState
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (id) => {
  const anecdote = await axios.get(`${baseUrl}/${id}`)
  const changedAnecdote = { 
    ...anecdote.data, 
    votes: anecdote.data.votes + 1
  }
  await axios.put(`${baseUrl}/${id}`, changedAnecdote)
}

export default {
  getAll,
  createNew,
  vote
}