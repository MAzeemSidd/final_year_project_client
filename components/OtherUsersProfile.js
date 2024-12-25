import { useState } from "react";
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecificUser } from "../redux/actions_&_reducers/fetchSpecificUserSlice";
import { handleFriendReq } from "../redux/actions_&_reducers/handleFriendReqSlice";
import { Button, Card, Text } from 'react-native-paper';
import { Avatar } from "@react-native-material/core";


export default function UserProfileBtn({ navigation, item }) {
    const { primaryColor, secondaryColor, textPrimaryColor, textSecondaryColor } = useSelector(state => state.themeColor);
    const { info } = useSelector(state => state.userInfo);
    const { _id: receiverID, name } = item;
    const [reqSent, setReqSent] = useState(false);

    const dispatch = useDispatch();


    //Send the friend request to user
    const sendFriendRequest = async () => {
      try {
          await dispatch(handleFriendReq({
          requestorID: info._id,
          receiverID,
          status: true
        }))
        setReqSent(true);
      } catch (error) {
        setReqSent(false);
      }
    }
    //Cencel the friend request that was sended to user
    const cencelFriendRequest = async () => {
      try {
          await dispatch(handleFriendReq({
          requestorID: info._id,
          receiverID,
          status: false
        }))
        setReqSent(false);
      } catch (error) {
        setReqSent(true);
      }
    }

    const accessUserProfile = async (obj) => {
      await dispatch(fetchSpecificUser(obj));
      navigation.navigate('OthersProfile');
    }


    return(
      <Card style={{minWidth: '95%', margin: 10}}>
        <View style={{ padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',
          alignItems: 'center'}}>
          <Avatar label={name} autoColor />
          <Card.Content onPress={()=>accessUserProfile({_id})}>
            <Text variant="titleMedium" style={{fontWeight: 'bold'}}>{name}</Text>
          </Card.Content>
        </View>
        <Card.Actions style={{padding: 5}}>
          <Button mode="contained-tonal" textColor={textSecondaryColor}
            onPress={()=>accessUserProfile({_id})}>View Profile</Button>
          {
            !reqSent ?
            <Button mode="contained" buttonColor={secondaryColor}
              onPress={sendFriendRequest}>Add Friend</Button>
            :
            <Button mode="contained-tonal" buttonColor='lightgrey'
              onPress={cencelFriendRequest}>Cancel Request</Button>
          } 
        </Card.Actions>
      </Card>
        // <Container colors={{primaryColor, textPrimaryColor}}>
        //     <InfoSection
        //       primaryColor={primaryColor}
        //       onPress={() => accessUserProfile({_id})}
        //     >
        //       <ProfileImageWrapper textSecondaryColor={textSecondaryColor}>
                // {/* <Image
                //   style={{width: 60, height: 60, overflow: 'hidden'}} 
                //   source={{uri: userImage}}
                // /> */}
        //       </ProfileImageWrapper>
        //       <UserNameWrapper>
        //           <UserName textSecondaryColor={textSecondaryColor}>{name}</UserName>
        //       </UserNameWrapper>
        //     </InfoSection>

        //     <BtnSection
        //       color={{primaryColor, textSecondaryColor}}
        //       onPress={() => {
        //         reqSent === false ? sendFriendRequest() : cencelFriendRequest()
        //       }}
        //     >
        //       {
        //         (reqSent === false) ?
        //         (
        //           <>
        //             <AntDesign
        //               name="adduser"
        //               size={22}
        //               style={{
        //                 color: textSecondaryColor,
        //                 marginRight: 5
        //               }}
        //             />
        //             <BtnText
        //               textSecondaryColor={textSecondaryColor}
        //             >
        //               Send Request
        //             </BtnText>
        //           </>
        //         ) :
        //         (<BtnText
        //           textSecondaryColor={textSecondaryColor}
        //         >
        //           Cencel Request
        //         </BtnText>)
        //       }
        //     </BtnSection>
        // </Container>
    )    
}



// const Container = styled.View`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
//   height: 110;
//   width: 95%;
//   margin-top: 15;
//   margin-left: 8px;
//   margin-right: 8px;
//   padding: 0px;
//   background-color: #000000;
//   border-radius: 5;
//   border-width: ${0.3};
//   border-color: ${props => props.colors.textPrimaryColor};
//   shadow-color: ${props => props.colors.textPrimaryColor};
//   elevation: 15;
// `;

// const InfoSection = styled.TouchableOpacity`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   height: 70%;
//   width: 100%;
//   margin: 0px;
//   padding: 0px 10px;
//   background-color: ${props => props.primaryColor};
//   border-top-left-radius: 5;
//   border-top-right-radius: 5;
// `;

// const ProfileImageWrapper = styled.View`
//   min-width: 60;
//   min-height: 60;
//   border-width: 1;
//   border-color: ${props => props.textSecondaryColor};
//   border-radius: 30;
// `;

// const profileImg = styled.Image`
//   width: 60;
//   height: 60;
//   overflow: hidden;
// `;

// const UserNameWrapper = styled.View`
//   flex-grow: 2;
//   height: 50;
//   width: 50%;
//   justify-content: center;
//   align-items: center;
//   overflow: hidden;
// `;

// const UserName = styled.Text`
//   font-size: 17;
//   font-weight: bold;
//   font-family: sans-serif;
//   color: ${props => props.textSecondaryColor};
// `;

// const BtnSection = styled.TouchableOpacity`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   height: 30%;
//   width: 100%;
//   margin: 0px;
//   padding: 0px 2px;
//   background-color: ${props => props.color.primaryColor};
//   border-color: ${props => props.color.textSecondaryColor};
//   border-top-width: 1px;
//   border-bottom-left-radius: 5;
//   border-bottom-right-radius: 5;
// `;

// const BtnText = styled.Text`
//   font-size: 14;
//   font-style: italic;
//   font-weight: bold;
//   font-family: sans-serif;
//   color: ${props => props.textSecondaryColor};
//   width: 35%;
//   text-align: center;
//   margin: 0px 5px;
// `;