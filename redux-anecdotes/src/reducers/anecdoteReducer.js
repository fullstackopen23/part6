import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from "../services/anecdotes"


const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
   appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      return state.map(a => a.id === action.payload.id ? action.payload : a)
    }
  }  
})

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initalizeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.vote(content)
    dispatch(updateAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer