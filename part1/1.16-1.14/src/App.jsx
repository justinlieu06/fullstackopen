import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h3>Give Feedback: </h3>
      <div>
        <button onClick={()=>setGood(good+1)}>Good</button>
        <button onClick={()=>setNeutral(neutral+1)}>Neutral</button>
        <button onClick={()=>setBad(bad+1)}>Bad</button>
      </div>
      <h3>Statistics:</h3>
      <p>Good Counter: {good}</p>
      <p>Neutral Counter: {neutral}</p>
      <p>Bad Counter: {bad}</p>
      <p>Total: {good+neutral+bad}</p>
      <p>Average: {((good-bad)/(good+neutral+bad)).toFixed(4)}</p>
      <p>Positive: {(good/(good+neutral+bad)).toFixed(4)}</p>
    </div>
  )
}

export default App