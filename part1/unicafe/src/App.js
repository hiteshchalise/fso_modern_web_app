import React from 'react';
import { useState } from 'react'

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticsLine = ({ text, value }) => {
  return (<tr><td>{text}</td><td>{value}</td></tr>)
}


const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  if (total === 0) return <p>No feedback given</p>
  const average = (Math.round(((good - bad) / total) * 100)) / 100;
  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={total} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={(good / total) * 100 + "%"} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (value) => { setGood(value) }
  const setToNeutral = (value) => { setNeutral(value) }
  const setToBad = (value) => { setBad(value) }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button text="good" handleClick={() => setToGood(good + 1)} />
        <Button text="neutral" handleClick={() => setToNeutral(neutral + 1)} />
        <Button text="bad" handleClick={() => setToBad(bad + 1)} />
      </div>

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
