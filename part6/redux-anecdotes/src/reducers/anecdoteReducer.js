import anecdoteService from '../services/anecdotes'


const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(n => n.id === id)
      const votedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes + 1 
      }
      return state.map(note =>
        note.id !== id ? note : votedAnecdote 
      )
    case "NEW_ANECDOTE":
      const anecdoteToAdd = action.data
      return [...state, anecdoteToAdd]
    case 'INIT_ANECDOTES':
      return action.data
    default: return state
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = {...anecdote, votes: anecdote.votes+1}
    const response  = await anecdoteService.vote(votedAnecdote)
    const id = response.id
    dispatch({
      type: "VOTE", 
      data: { id } 
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => { 
    const anecdote = await anecdoteService.createNew(content)
    console.log(anecdote)
      dispatch({
        type: 'NEW_ANECDOTE',
        data: anecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => { 
    const anecdotes = await anecdoteService.getAll()
    console.log(anecdotes)
      dispatch({
        type: 'INIT_ANECDOTES',
        data: anecdotes,
    })
  }
}


export default anecdoteReducer