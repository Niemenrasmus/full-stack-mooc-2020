import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const AnecdoteForm = ( {createAnecdote, setNotification} ) => {

    const create = async (event) => {
      event.preventDefault()

      const content = event.target.anecdote.value
      event.target.anecdote.value = ''

      createAnecdote(content)
      setNotification(`New anecdote '${content}'`, 5)
  }

  return (
    <div>
     <h2>create new</h2>
      <form onSubmit = {create}>
        <input name = "anecdote"/>
        <button type = "submit">create</button>
      </form>
    </div>
  )
}


const ConnectedAnecdoteForm = connect(null, { createAnecdote, setNotification })(AnecdoteForm)
export default ConnectedAnecdoteForm