import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addAnecdote } from '../../requests'

const AnecdoteForm = (props) => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(addAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      props.dispatch({type: "CREATE", payload: { content }})
      setTimeout(() => {
        props.dispatch({type: "DELETE"})
      }, 5000);
    },
    onError: (error) => {
      props.dispatch({type: "ERROR", payload: { content: error }})
      setTimeout(() => {
        props.dispatch({type: "DELETE"})
      }, 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    newAnecdoteMutation.mutate({content, votes: 0})
    event.target.anecdote.value = '' 
    
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
