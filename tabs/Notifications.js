import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import io from 'socket.io-client';

import { useSelector } from 'react-redux';



export default function Notifications() {
  const { textPrimaryColor, primaryColor2 } = useSelector(state => state.themeColor)
  const { info } = useSelector(state => state.userInfo);


  // const socket = io('http://192.168.0.6:5001');
 
  // useEffect(() => {
  //   socket.on(`Friend_Request_for_${info._id}`, async (data) => {
  //     console.log(data);
  //   })
  // }, [socket])
  


  return (
    <Container primaryColor2={primaryColor2}>
      <Ionicons
        name='notifications-outline'
        size={100} 
        color={textPrimaryColor}
      />
      <Label textPrimaryColor={textPrimaryColor}>This is Notifications tab</Label>
    </Container>
  );
}



const Container = styled.View`
  flex: 1;
  background-color: ${props => props.primaryColor2};
  align-items: center;
  justify-content: center;
`;

const Label = styled.Text`
  color: ${props => props.textPrimaryColor};
`;