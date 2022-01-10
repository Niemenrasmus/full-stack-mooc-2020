import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, vote}) => {
  return(
    <div>
     {anecdote.content}
     <div>
     </div>
       has {anecdote.votes}
     <button onClick={() => vote(anecdote)}>vote</button>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const dispatch = useDispatch()
  
  const vote = (anecdote) => {
    const content = anecdote.content
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`Voted for aanecdote '${content}'`, 5))
  }

  return(
    <ul>
      {anecdotes
      .filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => (a.votes > b.votes ? -1 : 1))
      .map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          vote = {vote}
        />
      )}
    </ul>
  )
}

export default AnecdoteList