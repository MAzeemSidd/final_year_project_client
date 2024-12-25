import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { FlatList, View, ScrollView } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Avatar, Button } from '@react-native-material/core';
import UserInfoCard from '../components/UserInfoCard';
import { fetchingSingleUserPosts } from '../redux/actions_&_reducers/fetchingSingleUserPosts';
import PostCard from '../components/PostCard';


export default function OthersProfile() {
  const { textPrimaryColor, textSecondaryColor, primaryColor, primaryColor2, secondaryColor } = useSelector(state => state.themeColor)
  const { userData } = useSelector(state => state.fetchSpecificUser);
  const { singleUserPosts } = useSelector(state => state.fetchingSingleUserPosts)
  const dispatch = useDispatch();
  
  const [userDataState, setUserDataState] = useState(null)
  useEffect(() => {
    setUserDataState(userData);
  }, [userData])
  useEffect(() => {
    dispatch(fetchingSingleUserPosts({_id: userData._id}));
  }, [])
  
  
  return (
    <ScrollView>
      <Container primaryColor2={primaryColor2}>
        <UserInfoCard userDataState={userDataState} />
        <View style={{marginVertical: 25, width: '105%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {/* <FlatList
            data={singleUserPosts}
            renderItem={({item}) => (<PostCard item={item} user={userData} />)}
            keyExtractor={item => item._id}
            style={{paddingTop: 10, paddingBottom: 10, marginBottom: 20}}
          /> */}
          {
            singleUserPosts.map(item => <PostCard item={item} user={userData}/>)
          }
        </View>
      </Container>
    </ScrollView>
  );
}



const Container = styled.View`
  flex: 1;
  background-color: ${props => props.primaryColor2};
  align-items: center;
  justify-content: flex-start;
`;

const UserNameWrapper = styled.View`
  margin: 20px 15px;
  padding: 20px 5px;
  border-bottom-width: 2;
  border-color: ${props => props.textPrimaryColor};
`;

const UserName = styled.Text`
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 2px;
  line-height: 35;
  text-align: center;
  font-family: serif;
  color: ${props => props.textPrimaryColor};
`;

const OtherInfoWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin: 3px;
  padding: 0px;
  background-color: ${props => props.primaryColor};
  min-width: 95%;
  border-radius: 10;
`;

const InfoLabel =styled.Text`
  font-size: 15;
  font-family: serif;
  padding: 5px 10px;
  border-width: 2;
  border-color: ${props => props.colors.primaryColor};
  color: ${props => props.colors.textPrimaryColor};
  background-color: ${props => props.colors.primaryColor2};
  border-radius: 10;
`;

const Info = styled.Text`
  font-size: 15;
  font-family: sans-serif;
  padding: 5px 10px;
  color: ${props => props.textSecondaryColor};
`;