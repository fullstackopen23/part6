import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Anecdote from './components/Anecdote'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from '../requests'
import { useReducer } from 'react'

const messageReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
        return `${action.payload.content} been created`
    case "DELETE":
        return ""
    case "VOTE":
        return `you voted '${action.payload.content}'`
    case "ERROR":
        return `An error occured! -> '${action.payload.content}'`
    default:
        return state
  }
}


const App = () => {
  const [msg, msgDispatch] = useReducer(messageReducer, "")

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  } else if ( result.isError ) {
    return <div>ehm.. error on the server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification msg={msg} />
      <AnecdoteForm dispatch={msgDispatch} />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <Anecdote dispatch={msgDispatch} anecdote={anecdote} anecdoteContent={anecdote.content} anecdoteVotes={anecdote.votes}/>
        </div>
      )}
    </div>
  )
}

export default App
