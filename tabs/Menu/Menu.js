import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import UserProfileBtn from './UserProfileBtn';
import ChangeThemeBtn from './ChangeThemeBtn';
import { Button } from 'react-native-paper';
import { logout } from '../../redux/actions_&_reducers/isLoginSlice';
import { resetOtherUserPosts } from '../../redux/actions_&_reducers/fetchingOtherUsersPostsSlice';
import { resetSingleUserPosts } from '../../redux/actions_&_reducers/fetchingSingleUserPosts';
import { resetSuggestedUsers } from '../../redux/actions_&_reducers/fetchingSuggestedUsers';
import { resetUsers } from '../../redux/actions_&_reducers/fetchingUsersSlice';
import { resetSpecificUser } from '../../redux/actions_&_reducers/fetchSpecificUserSlice';
import { resetReceivedRequestMessage } from '../../redux/actions_&_reducers/handleReceivedFriendReqSlice';
import { resetFriendRequestMessage } from '../../redux/actions_&_reducers/handleSendFriendReqSlice';
import { View } from 'react-native';
// import { logoutUser } from '../../redux/actions_&_reducers/userInfoSlice';



export default function Menu({ navigation }) {
  const { textSecondaryColor, secondaryColor, primaryColor2 } = useSelector(state => state.themeColor)
  const dispatch = useDispatch()

  const onUserLogout = () => {
    dispatch(resetOtherUserPosts());
    dispatch(resetSingleUserPosts());
    dispatch(resetSuggestedUsers());
    dispatch(resetUsers());
    dispatch(resetSpecificUser());
    dispatch(resetReceivedRequestMessage());
    dispatch(logout());
  }

  return (
    <Container primaryColor2={primaryColor2}>
      <MenuHeader>
        <MenuHeading textSecondaryColor={textSecondaryColor}>Menu</MenuHeading>
      </MenuHeader>

      <UserProfileBtn navigation={navigation} />

      <OptionsContainer>
        <ChangeThemeBtn navigation={navigation} />
        <Button icon="update" mode="elevated" textColor={secondaryColor} style={{marginVertical: 5}}
        onPress={() => navigation.navigate('UpdateUserInfo')}>
          Update Personal Info
        </Button>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button icon="logout" mode="contained" onPress={onUserLogout}
          style={{marginVertical: 10, backgroundColor: secondaryColor}} >
            Log Out
          </Button>
        </View>
      </OptionsContainer>
    </Container>
  );
}


const Container = styled.View`
  flex: 1;
  background-color: ${props => props.primaryColor2};
  align-items: center;
  justify-content: flex-start;
`;



const MenuHeader = styled.View`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 40;
  width: 95%;
  margin-top: 10;
  border-bottom-color: #606060;
  border-bottom-width: 2;
`;

const MenuHeading = styled.Text`
  font-family: sans-serif;
  font-size: 20;
  font-weight: bold;
  color: ${props => props.textSecondaryColor};
  padding: 0;
  margin: 0;
`;

const OptionsContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  min-height: 70%;
  width: 95%;
  margin-top: 25;
  padding: 10px 10px;
  background-color: #fffaff;
  border-radius: 5;
  border-top-width: 1;
  border-color: #606060;
`;