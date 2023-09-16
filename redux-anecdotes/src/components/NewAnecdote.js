import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {

  const dispatch = useDispatch()

  const createNewAnecdote = async (e) => {
    e.preventDefault()
    dispatch(createAnecdote(e.target.newAnecdoteInput.value))
    dispatch(setNotification(`you created '${e.target.newAnecdoteInput.value}'`, 3))

    e.target.newAnecdoteInput.value = ''
  }


  return (
    <form onSubmit={createNewAnecdote}>
      <h2>create new</h2>
      <div><input name='newAnecdoteInput'/></div>
      <button>create</button>
    </form>
  )
}

export default NewAnecdote