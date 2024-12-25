import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import Home from './Home';
import Peoples from './Peoples';
import Chats from './Chats';
import Notifications from './Notifications';
import Menu from './Menu/Menu';
import People from './People/People';




const Tab = createMaterialTopTabNavigator();

export default function Tabs() {
    const { primaryColor, secondaryColor } = useSelector(state => state.themeColor)
    // const tabBarIconColor = useSelector(state => state.themeColor.tabBarIconColor)

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle:{
                  backgroundColor: `${primaryColor}`
                }
            }}
        >
            
            <Tab.Screen
                // options={{headerLargeTitle: true}} //only work on IOS
                // options={{ headerCenter: ()=>(<Text>Home</Text>) }} // used by importing 'react-native-screens/native-stack'
                options={{
                    title: ({ focused }) =>
                        <Ionicons
                        name={focused ? 'md-home-sharp' : 'md-home-outline'} 
                        size={24} 
                        color={secondaryColor}
                        />,
                }}
                name='Home'
                component={Home}
            />

            <Tab.Screen
                options={{
                    title: ({ focused }) => 
                    <Ionicons
                        name={focused ? 'people-sharp' : 'people-outline'} 
                        size={28}
                        color={secondaryColor}
                    />
                }}
                name='Peoples'
                component={People}
            />

            <Tab.Screen
                options={{
                    title: ({ focused }) => 
                    <Ionicons
                        name={focused ? "md-chatbubble-ellipses" : "md-chatbubble-ellipses-outline" }
                        size={24}
                        color={secondaryColor}
                    />
                }}
                name='Chats'
                component={Chats}
            />

            <Tab.Screen
                options={{
                    title: ({ focused }) => 
                    <Ionicons
                        name={focused ? "notifications-sharp" : "notifications-outline" }
                        size={24}
                        color={secondaryColor}
                    />
                }}
                name='Notifications'
                component={Notifications}
            />

            <Tab.Screen
                options={{
                    title: ({ focused }) => 
                    <Ionicons
                        name={focused ? "md-menu-sharp" : "md-menu-outline" }
                        size={24}
                        color={secondaryColor}
                    />
                }}
                name='Menu'
                component={Menu}
            />

        </Tab.Navigator>
    );
}

// const styles = StyleSheet.create({
//     tab_nav_style: {
//     //   marginTop: StatusBar.currentHeight 
//       /*marginTop: Constants.statusBarHeight*/
//     },
// });