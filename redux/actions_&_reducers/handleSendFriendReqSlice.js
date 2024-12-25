import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import envVars from '../../config';

const initialState = {
  friendRequestMessage: null
}

export const handleSendFriendReq = createAsyncThunk(
  'handleSendFriendReq',
  async (obj) => {
    const res = await axios.patch(`http://${envVars.Server_IP}:5000/api/user/handle-send-friend-request`, obj);
    return res.data;
  }
)

export const handleSendFriendReqSlice = createSlice({
  name: 'handleSendFriendReq',
  initialState,
  extraReducers: {
    [handleSendFriendReq.fulfilled]: (state, action) => {
      state.friendRequestMessage = action.payload;
    },
    [handleSendFriendReq.rejected]: (state, action) => {
      state.friendRequestMessage = '****ERROR****';
    },
  },
  reducers: {
    resetFriendRequestMessage: (state) => {
      state.friendRequestMessage = null
    }
  }
})

// Action creators are generated for each case reducer function
export const { resetFriendRequestMessage } = handleSendFriendReqSlice.actions

export default handleSendFriendReqSlice.reducer