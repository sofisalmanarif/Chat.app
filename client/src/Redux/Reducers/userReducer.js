import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user:null     
    
  
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    
    login: (state,action) => {
        // console.log(action.payload)
      state.user = action.payload
    },
    logout: (state, action) => {
      state.user=null
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, } = authSlice.actions

export default authSlice.reducer