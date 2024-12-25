import { memo } from 'react'
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { Card, Text } from 'react-native-paper';
import { View } from 'react-native';
import { Avatar } from '@react-native-material/core';
import envVars from '../config';

const UserInfoCard = ({userDataState}) => {
    const { textPrimaryColor, textSecondaryColor, primaryColor, secondaryColor } = useSelector(state => state.themeColor)

    return (
        <>
            <UserNameWrapper textPrimaryColor={textPrimaryColor}>
                {/* <Avatar label={`${userDataState?.name}`} color={secondaryColor} /> */}
                {userDataState && 
                    <Avatar image={{ uri: `http://${envVars.Server_IP}:5000/${(userDataState?.profileImagePath).replace(/\\/g, "/")}` }} />
                }
                <UserName textPrimaryColor={textPrimaryColor}>{userDataState?.name}</UserName>
            </UserNameWrapper>
            
            <Card mode='contained' contentStyle={{backgroundColor: `${primaryColor}`, minWidth: '95%', borderRadius: 5}}>
                <Card.Content style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                paddingVertical: 5, paddingHorizontal: 15, margin: 0}}>
                <Text variant="titleMedium" style={{paddingRight: 20, color: `${textSecondaryColor}`, fontFamily: 'serif'}}>
                    Email ID:</Text>
                <Text variant="bodyLarge" style={{color: `${textPrimaryColor}`, fontFamily: 'sans-serif', fontWeight: 'bold'}}>
                    {userDataState?.emailID}</Text>
                </Card.Content>
                <Card.Content style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                paddingVertical: 5, paddingHorizontal: 15, margin: 0}}>
                <Text variant="titleMedium" style={{paddingRight: 20, color: `${textSecondaryColor}`, fontFamily: 'serif'}}>
                    Date of Birth:</Text>
                <Text variant="bodyLarge" style={{color: `${textPrimaryColor}`, fontFamily: 'sans-serif', fontWeight: 'bold'}}>
                    {userDataState?.dob.day} - {userDataState?.dob.month} - {userDataState?.dob.year}</Text>
                </Card.Content>
                <Card.Content style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                paddingVertical: 5, paddingHorizontal: 15, margin: 0}}>
                <Text variant="titleMedium" style={{paddingRight: 20, color: `${textSecondaryColor}`, fontFamily: 'serif'}}>
                    Eductation:</Text>
                <Text variant="bodyLarge" style={{color: `${textPrimaryColor}`, fontFamily: 'sans-serif', fontWeight: 'bold'}}>
                    {userDataState?.education}</Text>
                </Card.Content>
                <Card.Content style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
                paddingVertical: 5, paddingHorizontal: 15, margin: 0}}>
                <Text variant="titleMedium" style={{paddingRight: 20, color: `${textSecondaryColor}`, fontFamily: 'serif'}}>
                    Marital Status:</Text>
                <Text variant="bodyLarge" style={{color: `${textPrimaryColor}`, fontFamily: 'sans-serif', fontWeight: 'bold'}}>
                    {userDataState?.maritalStatus}</Text>
                </Card.Content>
            </Card>
        </>
    )
}

export default memo(UserInfoCard);

const UserNameWrapper = styled.View`
  margin: 20px 15px;
  padding: 10px 5px;
  border-bottom-width: 2;
  border-color: ${props => props.textPrimaryColor};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-item: center;
`;

const UserName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
  line-height: 30;
  text-align: center;
  font-family: serif;
  color: ${props => props.textPrimaryColor};
`;