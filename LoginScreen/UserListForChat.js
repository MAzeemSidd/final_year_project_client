import { useEffect, useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import { useDispatch, useSelector } from 'react-redux';
import { fetchingUsers } from '../redux/actions_&_reducers/fetchingUsersSlice';



export default function UserListForChat({navigation}) {
    const { primaryColor, primaryColor2, textSecondaryColor } = useSelector(state => state.themeColor);
    const { userData, message } = useSelector(state => state.fetchingUsers);
    const { info } = useSelector(state => state.userInfo);


    const dispatch = useDispatch();
    useEffect(async () => {
        console.log('useEffect "Dispatch"');
        await dispatch(fetchingUsers({id: info._id}));
    }, [])

    const renderItem = ({item})=>(
        <InfoSection
            primaryColor={primaryColor}
        >
            <ProfileImageWrapper textSecondaryColor={textSecondaryColor}>
                
            </ProfileImageWrapper>
            <UserNameWrapper>
                <UserName textSecondaryColor={textSecondaryColor}>
                  {item.name}  
                </UserName>
            </UserNameWrapper>
        </InfoSection>
    );


    return(
        <Container primaryColor2={primaryColor2}>
            <FlatListWrapper>
                <FlatList
                    data={userData}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
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
`;

const InfoSection = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 70%;
    width: 100%;
    margin: 0px;
    padding: 0px 10px;
    background-color: ${props => props.primaryColor};
    border-top-left-radius: 5;
    border-top-right-radius: 5;
`;

const ProfileImageWrapper = styled.View`
    width: 60;
    height: 60;
    border-width: 1;
    border-color: ${props => props.textSecondaryColor};
    border-radius: 30;
`;

const UserNameWrapper = styled.View`
    flex-grow: 2;
    height: 50;
    width: 50%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const UserName = styled.Text`
    font-size: 17;
    font-weight: bold;
    font-family: sans-serif;
    color: ${props => props.textSecondaryColor};
`;
