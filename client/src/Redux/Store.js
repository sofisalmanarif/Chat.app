import { configureStore } from '@reduxjs/toolkit'
import  authSlice  from './Reducers/userReducer'

export const store = configureStore({
  reducer: {
    authSlice:authSlice,
  },
})