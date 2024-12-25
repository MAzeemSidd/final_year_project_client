import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from '../tabs/Tabs';
import UserProfile from './UserProfile';
import ColorTheme from './ColorTheme';
import OthersProfile from './OthersProfile';
import UserListForChat from './UserListForChat';
import UpdateUserInfo from './UpdateUserInfo';
import CreatePost from './CreatePost';


const Stack = createStackNavigator();

export default function LoginScreen() {
    return (
        <Stack.Navigator
            // screenOptions={{headerShown: false}}
        >
            <Stack.Screen
                name='LoginScreen'
                component={Tabs}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name='UserProfile'
                component={UserProfile}
                options={{headerShown: true}}
            />
            <Stack.Screen
                name='ColorTheme'
                component={ColorTheme}
                options={{headerShown: true}}
            />
            <Stack.Screen
                name='OthersProfile'
                component={OthersProfile}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name='UserListForChat'
                component={UserListForChat}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name='UpdateUserInfo'
                component={UpdateUserInfo}
                options={{headerShown: true}}
            />
            <Stack.Screen
                name='CreatePost'
                component={CreatePost}
                options={{headerShown: true}}
            />
        </Stack.Navigator>
    );
}


