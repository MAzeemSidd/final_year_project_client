import { StyleSheet, Text, View } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';

import { useSelector } from 'react-redux';



export default function Chats({navigation}) {
  const { textPrimaryColor, primaryColor, primaryColor2, secondaryColor } = useSelector(state => state.themeColor)
 
  return (
    <Container>
      <ChatList backgroundColor={primaryColor2}>
        <Ionicons
          name='md-chatbubble-ellipses-outline'
          size={100} 
          color='#455A64'
        />
        <Label>This is Chat tab</Label>
      </ChatList>
      <BtnBar backgroundColor={secondaryColor}>
        <Btn
          bgColor='#57AAF1'
          borderColor={primaryColor}
          onPress={() => navigation.navigate('UserListForChat')}
        >
          <Ionicons name="add" size={24} color={primaryColor} />
          <BtnText textColor={primaryColor}>Add New Chat</BtnText>
        </Btn>
        <Btn
          bgColor='#A2A9AA'
          borderColor={primaryColor}
        >
          <AntDesign name="delete" size={20} color={primaryColor} />
          <BtnText textColor={primaryColor}>Delete Chat</BtnText>
        </Btn>
      </BtnBar>
    </Container>
  );
}



const Container = styled.View`
  display: flex;
  min-width: 100%;
  min-height: 100%;
`;

const Label = styled.Text`
  color: #455A64;
`;

const ChatList = styled.View`
  background-color: ${props => props.backgroundColor};
  align-items: center;
  justify-content: center;
  min-width: 100%;
  min-height: 90%;
`;

const BtnBar = styled.View`
  background-color: ${props => props.backgroundColor};
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  min-width: 100%;
  min-height: 10%;
  padding: 0px 10px 10px;
`;

const Btn = styled.TouchableOpacity`
  display: flex;
  justifyContent: space-evenly;
  alignItems: center;
  flex-direction: row;
  height: 30;
  width: 40%; 
  margin-top: 30;
  background-color: ${props => props.bgColor};
  border-color: ${props => props.borderColor};
  border-width: 2;
  border-radius: 15;
  margin-top: 10;
  margin-left: 5;
`;

const BtnText = styled.Text`
  color: ${props => props.textColor};
  font-weight: bold;
  font-size: 12;
`;