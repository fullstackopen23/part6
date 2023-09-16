import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filterBy = useSelector(state => state.filter)
    const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filterBy.toLowerCase()))
    const dispatch = useDispatch()
  
    const voteBtn = async (id) => {
        const votedAnecdote = anecdotes.filter(a => a.id === id)[0]
        dispatch(voteAnecdote(votedAnecdote))
        dispatch(setNotification(`you voted '${votedAnecdote.content}'`, 3))        
      }
    
    return (
        <div>
            {filteredAnecdotes.sort((a,b) => b.votes-a.votes).map(anecdote =>
                <div key={anecdote.id}>
                  <div>
                    {anecdote.content}
                  </div>
                  <div>
                    has {anecdote.votes}
                    <button onClick={() => voteBtn(anecdote.id)}>vote</button>
                  </div>
                </div>
              )}
        </div>
    )
  }
  
  export default AnecdoteList