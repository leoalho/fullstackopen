import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.name}
  </button>
)

const StatisticsLine = (props) => {
  return(
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const all = props.good+props.neutral+props.bad
  const keskiarvo = (props.good-props.bad)/(all)
  if (all === 0){
    return(
      <p>No feedback given</p>
    )
  }
  return(
    <div>
      <h1>Statistics</h1>
      <table>
      <StatisticsLine name="good" value={props.good}/>
      <StatisticsLine name="neutral" value={props.neutral}/>
      <StatisticsLine name="bad" value={props.bad}/>
      <StatisticsLine name="all" value={all}/>
      <StatisticsLine name="average" value={keskiarvo}/>
      <StatisticsLine name="positive" value={100*props.good/all +"%"}/>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button name="good" handleClick={()=> setGood(good+1)}/>
        <Button name="neutral" handleClick={()=> setNeutral(neutral+1)}/>
        <Button name="bad" handleClick={()=> setBad(bad+1)}/>
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App