import { createSlice } from '@reduxjs/toolkit'

 const notificationSlice = createSlice({
    name: "notification",
    initialState: "Inital Message",
    reducers: {
      setMessage(state, action) {
        return action.payload.message
      },
      deleteMessage(state, action) {
        return ""
      }
    }
  })

export const { setMessage, deleteMessage } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    await dispatch(setMessage({message}))
    setTimeout(() => {
      dispatch(deleteMessage());
    }, time*1000);
  }
}

export default notificationSlice.reducer