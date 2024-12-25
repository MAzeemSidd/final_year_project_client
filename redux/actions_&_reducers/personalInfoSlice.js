import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import envVars from '../../config';


const initialState = {
    loginUserInfo: {},
    message: ''
}

export const personalInfo = createAsyncThunk(
  'personalInfo',
  async (obj) => {
    const res = await axios.post(`http://${envVars.Server_IP}:5000/api/users/authentication`, obj)
    return res.data;
  }
)

export const personalInfoSlice = createSlice({
  name: 'personalInfo',
  initialState,
  extraReducers: {
    [personalInfo.fulfilled]: (state, action) => {
      state.loginUserInfo = action.payload;
      state.message = '';
    },
    [personalInfo.rejected]: (state) => {
      state.loginUserInfo = {};
      state.message = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function

export default personalInfoSlice.reducer