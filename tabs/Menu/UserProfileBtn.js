import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { Avatar } from "@react-native-material/core";
import envVars from '../../config';
import { Image } from 'react-native';


export default function UserProfileBtn({navigation}) {
  const { primaryColor, secondaryColor, textPrimaryColor, textSecondaryColor }  = useSelector(state => state.themeColor)
  const { info } = useSelector(state => state.userInfo);
  console.log("AAAAAA", (info.profileImagePath).replace(/\\/g, "/"))

  return(
    <Container colors={{primaryColor, textPrimaryColor}} onPress={() => navigation.navigate('UserProfile')}>
        <Avatar label={info.name} image={{ uri: `http://${envVars.Server_IP}:5000/${(info.profileImagePath).replace(/\\/g, "/")}` }} />
        <UserNameWrapper>
            <UserName textSecondaryColor={textSecondaryColor}>{`${info.name}'s Timeline`}</UserName>
        </UserNameWrapper>
    </Container>
  )    
}



const Container = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 75;
  width: 95%;
  margin-top: 15;
  padding: 0px 10px;
  background-color: ${props => props.colors.primaryColor};;
  border-radius: 5;
  border-width: ${0.3};
  border-color: ${props => props.colors.textPrimaryColor};
  shadow-color: ${props => props.colors.textPrimaryColor};
  elevation: 15;
`;

const ProfileImageWrapper = styled.View`
  min-width: 60;
  min-height: 60;
  border-width: 1;
  border-color: ${props => props.textSecondaryColor};
  border-radius: 30;
`;

const UserNameWrapper = styled.View`
  flex-grow: 2;
  min-height: 60;
  justify-content: center;
  align-items: center;
`;

const UserName = styled.Text`
  font-size: 17;
  font-weight: bold;
  font-family: sans-serif;
  color: ${props => props.textSecondaryColor};
`;