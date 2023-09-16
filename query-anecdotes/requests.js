import axios from 'axios'
const baseUrl = "http://localhost:3001/anecdotes"

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const addAnecdote = (object) => {
    if(object.content.length < 5) {
        return Promise.reject("The Anecdote must be at least 5 letters long")
    }
  axios.post(baseUrl, object).then(res => res.data)
}

export const voteAnecdote = (object) => {
    axios.put(`${baseUrl}/${object.id}`, object).then(res => res.data)
}