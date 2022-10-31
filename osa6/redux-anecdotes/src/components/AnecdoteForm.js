import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/store'
import anecdoteService from '../services/anecdotes'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newNote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newNote))
    dispatch(setNotification(`Added '${content}'`))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 3000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name = 'anecdote'/></div>
        <button type = 'submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm