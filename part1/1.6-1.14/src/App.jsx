import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}

// component that calculates statistics on the feedback given
const Statistics = (props) => {
  // console.log(props);
  const feedbackGiven = (props.good || props.neutral || props.bad);
  // console.log(feedbackGiven);
  const defaultMessage = "Error: No feedback given";
  return (
    <div>
      <h3>Application Statistics:</h3>
      {feedbackGiven ? <table>
        <tbody>
        {/* <tr><th>Count</th><th>Value</th></tr> */}
        <StatisticLine text="Good Counter: " value={props.good} />
        <StatisticLine text="Neutral Counter: " value={props.neutral} />
        <StatisticLine text="Bad Counter: " value={props.bad} />
        <StatisticLine text="Total: " value={((props.good-props.bad)/(props.good+props.neutral+props.bad)).toFixed(6)} />
        <StatisticLine text="Positive: " value={(props.good/(props.good+props.neutral+props.bad)).toFixed(6)} />
        </tbody>
        </table> :
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
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const anecdoteLikes = new Array(anecdotes.length).fill(0);
   
  const [selected, setSelected] = useState(0)
  const [likes, setLikes] = useState(anecdoteLikes)
  const [maxLikeIdx, setMaxLikeIdx] = useState(0);

  console.log('maxLikeIdx: '+maxLikeIdx);

  const handleClickLike = () => {
    console.log('handle click like');
    const copy = [...likes];
    copy[selected]+=1;
    if (copy[selected]>likes[maxLikeIdx]) setMaxLikeIdx(selected); // keep track of which idx has most likes
    setLikes(copy);
  }

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h3>Random Anecdote</h3>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        <Button onClick={()=>setSelected(Math.floor(Math.random()*anecdotes.length))} text="New Random Anecdote"></Button>
        <Button onClick={handleClickLike} text="Like"></Button>
      </div>
      <div>
        Likes: {likes[selected]}
      </div>

      <h3>Anecdote with most votes:</h3>
      <div>
        {anecdotes[maxLikeIdx]}
      </div>

      <h3>Give Feedback on this SPA: </h3>
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