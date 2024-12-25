import { useEffect, useState, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import Peoples from '../Peoples';
import { fetchingUsers } from '../../redux/actions_&_reducers/fetchingUsersSlice';
import { fetchingSuggestedUsers } from '../../redux/actions_&_reducers/fetchingSuggestedUsers'
import { userAuthenticationFunction } from '../../redux/actions_&_reducers/userInfoSlice';

const Tab = createBottomTabNavigator();

export default function People({navigation}) {
  const [refresh, setRefresh] = useState(false)
  const { info } = useSelector(state => state.userInfo);
  const { userData } = useSelector(state => state.fetchingUsers);
  const { suggestedUsers } = useSelector(state => state.fetchingSuggestedUsers)
  
  const [loginUserInfo, setLoginUserInfo] = useState(info)
  const [usersDetail, setUsersDetail] = useState(userData)
  const [suggestedUsersDetail, setSuggestedUsersDetail] = useState(userData)

  //Getting access to user info(timeline)
  const dispatch = useDispatch();
  const handleUpdateData = () => {
    setRefresh(!refresh);
    dispatch(fetchingUsers({id: loginUserInfo._id}))
    dispatch(fetchingSuggestedUsers(loginUserInfo));
    dispatch(userAuthenticationFunction({emailID: loginUserInfo.emailID, password: loginUserInfo.password}))
  };

  useEffect(() => {
    dispatch(fetchingUsers({id: loginUserInfo._id}))
    dispatch(fetchingSuggestedUsers(loginUserInfo));
    dispatch(userAuthenticationFunction({emailID: loginUserInfo.emailID, password: loginUserInfo.password}))
  },[])
  useEffect(()=>{
    setLoginUserInfo(info)
    setUsersDetail(userData)
    setSuggestedUsersDetail(suggestedUsers)
  },[info, userData, suggestedUsers])


  const { primaryColor, secondaryColor } = useSelector(state => state.themeColor)
  const Others = useCallback(() => {
    return (usersDetail && <Peoples navigation={navigation} data={usersDetail} loginUserInfo={loginUserInfo} handleUpdateData={handleUpdateData} listType={'others'} />)
  },[usersDetail])
  const SuggestedUsers = useCallback(() => {
    return (suggestedUsersDetail && <Peoples navigation={navigation} data={suggestedUsersDetail} loginUserInfo={loginUserInfo} handleUpdateData={handleUpdateData} listType={'others'} />)
  },[loginUserInfo])
  const Requests = useCallback(() => {
    return (loginUserInfo && <Peoples navigation={navigation} data={loginUserInfo?.friendRequests} loginUserInfo={loginUserInfo} handleUpdateData={handleUpdateData} listType={'requests'} />)
  },[loginUserInfo])
  const Friends = useCallback(() => {
    return (loginUserInfo && <Peoples navigation={navigation} data={loginUserInfo?.friends} loginUserInfo={loginUserInfo} handleUpdateData={handleUpdateData} listType={'friends'} />)
  },[loginUserInfo])
    

  return (
    <Tab.Navigator
        screenOptions={{headerShown: false}}
        
    >
        <Tab.Screen name="Others" component={Others}
            options={{
                title: ({ focused }) =>
                <>
                    <Ionicons name={focused ? 'people-sharp' : 'people-outline'} size={24} color={focused ? secondaryColor : 'grey'} />
                    <Text style={{fontSize: 10, fontFamily: 'sans-serif', color: `${focused ? secondaryColor : 'grey'}`}}>Others</Text>    
                </>
            }}
        />
        <Tab.Screen name="Suggested" component={SuggestedUsers}
            options={{
                title: ({ focused }) =>
                <>
                    <Ionicons name={focused ? 'people-sharp' : 'people-outline'} size={24} color={focused ? secondaryColor : 'grey'} />
                    <Text style={{fontSize: 10, fontFamily: 'sans-serif', color: `${focused ? secondaryColor : 'grey'}`}}>Suggested</Text>    
                </>
            }}
        />
      <Tab.Screen name="Requests" component={Requests}
        options={{
            title: ({ focused }) =>
            <>
                <Ionicons name={focused ? 'enter-sharp' : 'enter-outline'} size={24} color={focused ? secondaryColor : 'grey'} />
                <Text style={{fontSize: 10, fontFamily: 'sans-serif', color: `${focused ? secondaryColor : 'grey'}`}}>Requests</Text>    
            </>
        }}
      />
      <Tab.Screen name="Friends" component={Friends}
        options={{
            title: ({ focused }) =>
            <>
                <Ionicons name={focused ? 'people-circle-sharp' : 'people-circle-outline'} size={24} color={focused ? secondaryColor : 'grey'} />
                <Text style={{fontSize: 10, fontFamily: 'sans-serif', color: `${focused ? secondaryColor : 'grey'}`}}>Friends</Text>    
            </>
        }}
      />
    </Tab.Navigator>
  );
}