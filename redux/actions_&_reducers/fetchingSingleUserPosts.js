import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import envVars from '../../config';

const initialState = {
    singleUserPosts: []
}

export const fetchingSingleUserPosts = createAsyncThunk(
  'fetchingSingleUserPosts',
  async (obj) => {
    const res = await axios.post(`http://${envVars.Server_IP}:5000/api/post/get-single-user-posts`, obj);
    return res.data;
  }
)

export const fetchingSingleUserPostsSlice = createSlice({
  name: 'fetchingSingleUserPosts',
  initialState,
  extraReducers: {
    [fetchingSingleUserPosts.fulfilled]: (state, action) => {
      state.singleUserPosts = action.payload;
    },
    [fetchingSingleUserPosts.rejected]: (state, action) => {
      state.singleUserPosts = [];
    },
  },
  reducers: {
    resetSingleUserPosts: (state) => {
      state.singleUserPosts = []
    }
  }
})

// Action creators are generated for each case reducer function
export const { resetSingleUserPosts } = fetchingSingleUserPostsSlice.actions

export default fetchingSingleUserPostsSlice.reducer