import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import Signup from './Signup';
import React from 'react';


const Stack = createStackNavigator();

export default function Stacks() {
    return (
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen
                name='Login'
                component={Login}
                // options={{headerShown: false}}
            />
            <Stack.Screen
                name='Signup'
                component={Signup}
                // options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}


