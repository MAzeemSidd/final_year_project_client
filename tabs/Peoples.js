import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecificUser } from "../redux/actions_&_reducers/fetchSpecificUserSlice";
import { handleSendFriendReq } from "../redux/actions_&_reducers/handleSendFriendReqSlice";
import { handleReceivedFriendReq } from "../redux/actions_&_reducers/handleReceivedFriendReqSlice";
import { Button, Card, Text } from 'react-native-paper';
import { Avatar } from "@react-native-material/core";
import envVars from '../config'


function RenderUserProfileCard({ navigation, item, loginUserInfo, handleUpdateData, listType }) {
  const { primaryColor, secondaryColor, textPrimaryColor, textSecondaryColor } = useSelector(state => state.themeColor);
  const { _id: userID, name, profileImagePath } = item;
  const [reqSent, setReqSent] = useState(false);

  useEffect(() => {
    setReqSent(setReqSent(!reqSent))
  }, [sendFriendRequest, cencelFriendRequest])
  

  const dispatch = useDispatch();
  //Send the friend request to user
  const sendFriendRequest = () => {
    dispatch(handleSendFriendReq({
      requestorID: loginUserInfo._id,
      receiverID: userID,
      status: true
    }))
    setReqSent(true);
  }
  //Cencel the friend request that was sended to user
  const cencelFriendRequest = () => {
    dispatch(handleSendFriendReq({
      requestorID: loginUserInfo._id,
      receiverID: userID,
      status: false
    }))
    setReqSent(false);
  }
  //Accept friend request
  const acceptFriendRequest = () => {
    dispatch(handleReceivedFriendReq({
      requestorID: userID,
      receiverID: loginUserInfo._id,
      status: true
    }))
    handleUpdateData();
  }
  //Decline friend request
  const declineFriendRequest = () => {
    dispatch(handleReceivedFriendReq({
      requestorID: userID,
      receiverID: loginUserInfo._id,
      status: false
    }))
    handleUpdateData();
  }

  const accessUserProfile = async (obj) => {
    await dispatch(fetchSpecificUser(obj));
    await navigation.navigate('OthersProfile');
  }

  return(
    <Card style={{minWidth: '95%', margin: 10}}>
      <View style={{ padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
        alignItems: 'center'}}>
        {
          profileImagePath ? 
          <Avatar image={{ uri: `http://${envVars.Server_IP}:5000/${(profileImagePath).replace(/\\/g, "/")}` }}
            style={{marginRight: 10}} />
          :
          <Avatar label={name} autoColor />
        }
        <Card.Content>
          <Text variant="titleMedium" style={{fontWeight: 'bold'}}>{name}</Text>
        </Card.Content>
      </View>
      <Card.Actions style={{padding: 5}}>
        <Button mode="contained-tonal" textColor={textSecondaryColor}
          onPress={()=>accessUserProfile({_id: userID})}>View Profile</Button>
        {
          listType == 'others' && (
            !reqSent ?
            <Button mode="contained" buttonColor={secondaryColor}
              onPress={sendFriendRequest}>Add Friend</Button>
            :
            <Button mode="contained-tonal" buttonColor='lightgrey'
              onPress={cencelFriendRequest}>Cancel Request</Button>
          )
        }
        {
          listType == 'requests' && <>
            <Button mode="contained-tonal" buttonColor='lightgrey'
              onPress={declineFriendRequest}>Decline</Button>
            <Button mode="contained" buttonColor={secondaryColor}
              onPress={acceptFriendRequest}>Accept</Button>
          </>
        }
        {
          listType == 'friends' && <>
            <Button mode="contained" buttonColor={secondaryColor}
              >Chat</Button>
          </>
        }
      </Card.Actions>
    </Card>
  )
}



export default function Peoples({navigation, data, loginUserInfo, handleUpdateData, listType}) {
  const {  primaryColor2 } = useSelector(state => state.themeColor)

  const renderItem = ({item})=>(
    data && (
    <RenderUserProfileCard navigation={navigation} item={item} loginUserInfo={loginUserInfo} handleUpdateData={handleUpdateData} listType={listType} />)
  );


  return (
    <Container primaryColor2={primaryColor2}>
      <FlatListWrapper>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />
      </FlatListWrapper>
    </Container>
  );
}



const Container = styled.View`
  display: flex;
  background-color: ${props => props.primaryColor2};
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const FlatListWrapper = styled.View`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 5px;
`;


