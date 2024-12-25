import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import envVars from '../../config';

const initialState = {
  userData: null,
  message: null
}
console.log("FetchSpecificUser", initialState)
export const fetchSpecificUser = createAsyncThunk(
  'fetchSpecificUser',
  async (obj) => {
    const res = await axios.post(`http://${envVars.Server_IP}:5000/api/specific-user/data`, obj);
    return res.data;
  }
)

export const fetchSpecificUserSlice = createSlice({
  name: 'fetchSpecificUser',
  initialState,
  extraReducers: {
    [fetchSpecificUser.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.message = null;
    },
    [fetchSpecificUser.rejected]: (state) => {
      state.userData = null;
      state.message = 'Either Url is incorrect or No Item in the Database';
    },
  },
  reducers: {
    resetSpecificUser: (state) => {
      state.userData = null,
      state.message = null
    }
  }
})

// Action creators are generated for each case reducer function
export const { resetSpecificUser } = fetchSpecificUserSlice.actions

export default fetchSpecificUserSlice.reducer