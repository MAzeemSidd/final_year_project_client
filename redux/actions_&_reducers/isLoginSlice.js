import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const isLoginSlice = createSlice({
  name: 'isLogin',
  initialState,
  reducers: {
    login: (state) => {
      state.value = true
    },
    logout: (state) => {
      state.value = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = isLoginSlice.actions

export default isLoginSlice.reducer