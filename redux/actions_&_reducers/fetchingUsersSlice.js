import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import envVars from '../../config';


const initialState = {
  userData: [],
  message: null
}

export const fetchingUsers = createAsyncThunk(
  'fetchingUsers',
  async (id) => {
    const res = await axios.post(`http://${envVars.Server_IP}:5000/api/users/data`, id);
    return res.data;
  }
)

export const fetchingUsersSlice = createSlice({
  name: 'fetchingUsers',
  initialState,
  extraReducers: {
    [fetchingUsers.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.message = null;
    },
    [fetchingUsers.rejected]: (state) => {
      state.userData = [];
      state.message = 'Either Url is incorrect or No Item in the Database';
    },
  },
  reducers: {
    resetUsers: (state) => {
      state.userData = [],
      state.message = null
    }
  }
})

// Action creators are generated for each case reducer function
export const { resetUsers } = fetchingUsersSlice.actions

export default fetchingUsersSlice.reducer