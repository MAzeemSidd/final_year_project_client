import React, { useEffect } from 'react'
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import Stacks from './stacks/Stacks';
import LoginScreen from './LoginScreen/LoginScreen';

enableScreens();



export default function SocialFinderApp() {
  const isLogin = useSelector(state => state.isLogin.value);
  // const { isLogin } = useSelector(state => state.userInfo);

  const { primaryColor, secondaryColor } = useSelector(state => state.themeColor);

  

  return (
    <>
      <AppBanner secondaryColor={secondaryColor}>
        <AppName primaryColor={primaryColor}>Social Finder App</AppName>
      </AppBanner>
      <NavigationContainer>
        {isLogin ? <LoginScreen /> : (
          <Stacks />
        )}
      </NavigationContainer>
    </>
  );
}



const AppBanner = styled.View`
  margin-top: ${StatusBar.currentHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0px;
  background-color: ${props => props.secondaryColor};
`;

const AppName = styled.Text`
  color: ${props => props.primaryColor};
  font-size: 20;
  font-weight: bold;
  letter-spacing: 3;
`;