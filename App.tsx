import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    Home,
    Global,
    SettingsStackScreen
} from './src/pages';



//* HEX COLOR: #8031A7; for grapes purple
// * or a darker: #4E1E66 for grapes purple
//*              #889CAF
// grape emoji: 🍇

const Tab = createMaterialTopTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color }) => {
                        let iconName: string = 'ios-information-circle-outline';
                        if (route.name) {
                            if (route.name === 'Home') {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (route.name === 'Global') {
                                iconName = focused ? 'earth' : 'earth-outline';
                            } else if (route.name === 'More') {
                                iconName = focused ? 'fruit-grapes' : 'fruit-grapes-outline';
                                return <MaterialCommunityIcons name={iconName} size={20} color={color} />;
                            }
                        }
                        return <Ionicons name={iconName} size={20} color={color} />;
                    },
                    // headerShown: route.name === 'Home' ? false : true,
                    // headerShown: false,
                    tabBarActiveTintColor: '#8ABD91',
                    tabBarInactiveTintColor: '#f3f0f5', // text color for words that are not selected
                    tabBarStyle: { backgroundColor: '#4E1E66', paddingTop: 30 },
                    tabBarIndicatorStyle: { backgroundColor: '#8ABD91', height: 5 },
                })}>
                <Tab.Screen name="Home" component={Home}
                    options={{ title: 'Home' }}
                />
                {/* // TODO make edit and share be a link from individual letter */}
                {/* <Tab.Screen name="Edit" component={Edit} options={{ title: 'Edit a Letter' }} /> */}
                <Tab.Screen name="Global" component={Global} options={{ title: 'Feed' }} />
                {/* <Tab.Screen name="Share" component={Share} options={{ title: 'Share a Letter Globally' }} /> */}
                <Tab.Screen name="More" component={SettingsStackScreen} options={{ title: 'M🍇re' }} />
            </Tab.Navigator>
            <StatusBar style='auto' hidden={true} />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#889CAF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
