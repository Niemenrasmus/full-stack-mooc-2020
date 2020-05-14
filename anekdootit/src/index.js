import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function indexOfMax(arr, len) {
  if (arr.length === 0) {
      return -1;
  }

  var max = arr[0];
  var maxIndex = 0;
  for (var i = 1; i < len; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
  }

  return maxIndex;
}

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const anecdotes_len = anecdotes.length

  const[points, setPoints] = useState(new Array(anecdotes_len+1).join('0').split('').map(parseFloat))


  const handleClick = () => {
    setSelected(getRandomInt(anecdotes_len))
  }  

  const handleVote = () => {
    const copy = {...points}
    copy[selected] += 1
    setPoints(copy)
  } 

  return (
    <div>
      <div style={{fontSize: 30, fontWeight: 'bold', marginTop:'2rem',  marginBottom: '1rem'}}>
        Anectode of the day
      </div>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        This anecdote has {points[selected]} votes
      </div>
      <div>
        <Button onClick={handleClick} text='Next anecdote' />
        <Button onClick={handleVote} text='Vote' />
      </div>
      <div style={{fontSize: 30, fontWeight: 'bold', marginTop:'2rem',  marginBottom: '1rem'}}>
        This anectode has the most votes  
      </div>
      <div>
      {props.anecdotes[indexOfMax(points, anecdotes_len)]}         
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)