import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import { fetchingUsers } from './fetchingUsersSlice'
import axios from "axios";
import envVars from '../../config';

const initialState = {
  ReceivedRequestMessage: null
}

export const handleReceivedFriendReq = createAsyncThunk(
  'handleReceivedFriendReq',
  async (obj) => {
    const res = await axios.patch(`http://${envVars.Server_IP}:5000/api/user/handle-received-friend-request`, obj);
    return res.data;
  }
)

export const handleReceivedFriendReqSlice = createSlice({
  name: 'handleReceivedFriendReq',
  initialState,
  extraReducers: {
    [handleReceivedFriendReq.fulfilled]: (state, action) => {
      state.ReceivedRequestMessage = action.payload;
    },
    [handleReceivedFriendReq.rejected]: (state, action) => {
      state.ReceivedRequestMessage = '****ERROR****';
    },
  },
  reducers: {
    resetReceivedRequestMessage: (state) => {
      state.ReceivedRequestMessage = null
    }
  }
})

// Action creators are generated for each case reducer function
export const { resetReceivedRequestMessage } = handleReceivedFriendReqSlice.actions

export default handleReceivedFriendReqSlice.reducer