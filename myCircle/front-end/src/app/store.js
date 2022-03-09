import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

let state = {

  isSignedIn: false,

}

function getState() {

}

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})