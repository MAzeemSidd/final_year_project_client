import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import envVars from '../../config';

const initialState = {
    otherUsersPosts: []
}

export const fetchingOtherUsersPosts = createAsyncThunk(
  'fetchingOtherUsersPosts',
  async (obj) => {
    const res = await axios.post(`http://${envVars.Server_IP}:5000/api/post/get-other-users-posts`, obj);
    return res.data;
  }
)

export const fetchingOtherUsersPostsSlice = createSlice({
  name: 'fetchingOtherUsersPosts',
  initialState,
  extraReducers: {
    [fetchingOtherUsersPosts.fulfilled]: (state, action) => {
      state.otherUsersPosts = action.payload;
    },
    [fetchingOtherUsersPosts.rejected]: (state, action) => {
      state.otherUsersPosts = [];
    },
  },
  reducers: {
    resetOtherUserPosts: (state) => {
      state.otherUsersPosts = []
    }
  }
})

// Action creators are generated for each case reducer function
export const { resetOtherUserPosts } = fetchingOtherUsersPostsSlice.actions

export default fetchingOtherUsersPostsSlice.reducer