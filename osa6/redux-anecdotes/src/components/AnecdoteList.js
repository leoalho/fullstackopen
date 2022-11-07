import { useSelector, useDispatch } from 'react-redux'
import { voter } from '../reducers/store'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  console.log(anecdotes)
  const filter = useSelector(state => state.filter)
  const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(filter.toUpperCase()))

  const dispatch = useDispatch()
  console.log(anecdotes)

  const vote = (id) => {
    dispatch(voter(id))
    const anecdote = anecdotes.find(n => id === n.id)
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))

  }
  
  return (
    <div>
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList