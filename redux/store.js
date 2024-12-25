import { configureStore } from '@reduxjs/toolkit'
import fetchingUsersSlice from './actions_&_reducers/fetchingUsersSlice'
import fetchSpecificUserSlice from './actions_&_reducers/fetchSpecificUserSlice'
import isLoginReducer from './actions_&_reducers/isLoginSlice'
import themeColorReducer from './actions_&_reducers/themeColorSlice'
import userInfoSlice from './actions_&_reducers/userInfoSlice'
import handleSendFriendReqSlice from './actions_&_reducers/handleSendFriendReqSlice'
import handleReceivedFriendReqSlice from './actions_&_reducers/handleReceivedFriendReqSlice'
import personalInfoSlice from './actions_&_reducers/personalInfoSlice'
import fetchingOtherUsersPostsSlice from './actions_&_reducers/fetchingOtherUsersPostsSlice'
import fetchingSingleUserPostsSlice from './actions_&_reducers/fetchingSingleUserPosts'
import fetchingSuggestedUsersSlice from './actions_&_reducers/fetchingSuggestedUsers'

export const store = configureStore({
  reducer: {
    isLogin: isLoginReducer,
    themeColor: themeColorReducer,
    userInfo: userInfoSlice,
    personalInfo: personalInfoSlice,
    fetchingUsers: fetchingUsersSlice,
    fetchSpecificUser: fetchSpecificUserSlice,
    handleSendFriendReq: handleSendFriendReqSlice,
    handleReceivedFriendReq: handleReceivedFriendReqSlice,
    fetchingOtherUsersPosts: fetchingOtherUsersPostsSlice,
    fetchingSingleUserPosts: fetchingSingleUserPostsSlice,
    fetchingSuggestedUsers: fetchingSuggestedUsersSlice,
  },
})