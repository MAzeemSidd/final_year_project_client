import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import envVars from '../../config';

const initialState = {
  info: {},
  message: null,
  auth: false
}

export const userAuthenticationFunction = createAsyncThunk(
  'userAuthenticationFunction',
  async (obj) => {
    const res = await axios.post(`http://${envVars.Server_IP}:5000/api/users/authentication`, obj)
    return res.data;
  }
)

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setInfo: (state, { payload }) => {
        state.info = payload;
    },
    resetInfo: (state) => {
        state.info = {};
    },
    logoutUser: (state) => {
      state.info = {};
      state.message = null;
      state.auth = false;
    }
  },
  extraReducers: {
    [userAuthenticationFunction.fulfilled]: (state, action) => {
      state.info = action.payload;
      state.message = 'User Authentication Successfull';
      state.auth = true;
    },
    [userAuthenticationFunction.rejected]: (state) => {
      state.info = {};
      state.message = 'Fields are either MISSING or INCORRECT';
      state.auth = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setInfo, resetInfo, logoutUser } = userInfoSlice.actions

export default userInfoSlice.reducer