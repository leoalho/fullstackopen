import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  function satunnaisluku(){
    let luku = parseInt(anecdotes.length*Math.random(Array(anecdotes.length).fill(0)))
    return setSelected(luku)
  }

  function aanesta(){
   
    let uusi = [...votes]
    uusi[selected]+=1
    return setVotes(uusi)
  }

  function max(lista){
    let maksimi = 0
    for (let i = 1; i < lista.length; i++) { 
      if (lista[i]>lista[maksimi]){
        maksimi = i
      }
    }
    return maksimi
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}<br />
        has {votes[selected]} votes
      </p>
      <div>
        <button onClick={aanesta}> Vote</button>
        <button onClick={satunnaisluku}>next anecdote</button>
      </div>
      <h1>Anectode with the most votes</h1>
      <div>
        {anecdotes[max(votes)]}
      </div>
    </div>
  )
}

export default App
