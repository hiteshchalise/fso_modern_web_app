import React, { useState } from 'react';

const Anecdotes = ({ anecdote, votes }) => {
  return (
    <div>
      {anecdote}<br />
      has {votes} votes
    </div>
  )
}

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));

  const generateRandomValue = () => Math.floor(Math.random() * anecdotes.length);

  const incrementVote = () => {
    const copyVotes = [...votes];
    copyVotes[selected] += 1;
    setVotes(copyVotes);
  }

  const mostVoted = votes.reduce((acc, value, index, _) => {
    if (value > acc.value) return { index, value };
    return { ...acc };
  }, { 'index': selected, 'value': votes[selected] });

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <Anecdotes anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={incrementVote} text="vote" />
      <Button handleClick={() => setSelected(generateRandomValue())} text="next anecdote" />
      <h2>Anecdotes with most votes</h2>
      <Anecdotes anecdote={anecdotes[mostVoted.index]} votes={mostVoted.value} />
    </div>
  )
}
export default App;
