import React, { useState } from 'react'
import ReactDOM from 'react-dom'


  const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )

  const StatisticLine  = ({text, value}) => {
    return (      
      <tr>
        <td>{text}:</td>
        <td>{value}</td>
      </tr>
    )
  }

  const Statistics = (props) => {

    if (props.click[0] + props.click[1] + props.click[2] === 0) {
      return (
        <div style={{fontSize: 20, fontWeight: 'bold', marginTop:'2rem',  marginBottom: '1rem'}}>
        No feedback given
        </div>
      )  
    }
    return (
    <div>
      <div style={{fontSize: 30, fontWeight: 'bold', marginTop:'2rem',  marginBottom: '1rem'}}>
      Todays statistics
      </div>
      <table>
        <tbody>
          <StatisticLine text = "Good" value = {props.click[0]}/>
          <StatisticLine text = "Neutral" value = {props.click[1]}/>  
          <StatisticLine text = "Bad" value = {props.click[2]} />
          <StatisticLine text = "Average" value = {(props.click[0]-props.click[2])/(props.click[0]+props.click[1]+props.click[2])}  />
          <StatisticLine text = "Positive" value = {`${props.click[0] / (props.click[0] + props.click[1] + props.click[2]) * 100} %` }/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGoodClick = () => {
    setGood(good+1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }

  const handleBadClick = () => {
    setBad(bad+1)
  }

  return (
  <div>
    <div style={{fontSize: 30, fontWeight: 'bold', marginBottom: '2rem'}}>
    How was your Unicafe experience today?
    </div>  
      <Button onClick={handleGoodClick} text = 'Good'/>
      <Button onClick={handleNeutralClick} text = 'Neutral' />
      <Button onClick={handleBadClick} text = 'Bad' />
      <Statistics click = {[ good, neutral, bad]}/>
  </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)