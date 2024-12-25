import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import envVars from '../../config';

const initialState = {
    suggestedUsers: []
}

export const fetchingSuggestedUsers = createAsyncThunk(
  'fetchingSuggestedUsers',
  async (obj) => {
    const res = await axios.post(`http://${envVars.Server_IP}:5000/api/users/suggested-users`, obj);
    return res.data;
  }
)

export const fetchingSuggestedUsersSlice = createSlice({
  name: 'fetchingSuggestedUsers',
  initialState,
  extraReducers: {
    [fetchingSuggestedUsers.fulfilled]: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    [fetchingSuggestedUsers.rejected]: (state) => {
      state.suggestedUsers = [];
    },
  },
  reducers: {
    resetSuggestedUsers: (state) => {
      state.suggestedUsers = []
    }
  }
})

// Action creators are generated for each case reducer function
export const { resetSuggestedUsers } = fetchingSuggestedUsersSlice.actions

export default fetchingSuggestedUsersSlice.reducer