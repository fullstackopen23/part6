import { useQueryClient, useMutation } from "@tanstack/react-query"
import { voteAnecdote } from "../../requests"

const Anecdote = (props) => {
    const queryClient = useQueryClient()


    const voteAnecdoteMutation = useMutation(voteAnecdote, {
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        },
    })

    const handleVote = (anecdote) => {
        voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
        props.dispatch({type: "VOTE", payload: { content: anecdote.content }})
        setTimeout(() => {
          props.dispatch({type: "DELETE"})
        }, 5000);
      }

    return (
      <div>
          <div>
            {props.anecdote.content}
          </div>
          <div>
            has {props.anecdote.votes}
            <button onClick={() => handleVote(props.anecdote)}>vote</button>
          </div>
      </div>
    )
  }
  
  export default Anecdote
  