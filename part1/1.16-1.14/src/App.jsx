import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <p>
      {text} {value}
    </p>
  )
}

const Statistics = (props) => {
  console.log(props);
  const feedbackGiven = (props.good || props.neutral || props.bad);
  console.log(feedbackGiven);
  const defaultMessage = "No feedback given";
  return (
    <div>
      <h3>Statistics:</h3>
      {feedbackGiven ? <div>
        <StatisticLine text="Good Counter: " value={props.good} />
        <StatisticLine text="Neutral Counter: " value={props.neutral} />
        <StatisticLine text="Bad Counter: " value={props.bad} />
        <StatisticLine text="Total: " value={((props.good-props.bad)/(props.good+props.neutral+props.bad)).toFixed(4)} />
        <StatisticLine text="Positive: " value={(props.good/(props.good+props.neutral+props.bad)).toFixed(4)} />
        </div> :
        defaultMessage
      }
    </div>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h3>Give Feedback: </h3>
      <div>
        <Button onClick={()=>setGood(good+1)} text="Good" />
        <Button onClick={()=>setNeutral(neutral+1)} text="Neutral" />
        <Button onClick={()=>setBad(bad+1)} text="Bad" />
        
      </div>
      
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App