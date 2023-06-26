import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
    About,
    Account,
    Home,
    Edit,
    Global,
    Share,
    SettingsStackScreen
} from './src/pages';







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
                                iconName = focused ? 'ios-ellipsis-vertical-circle-sharp' : 'ios-ellipsis-vertical-circle-outline';
                            }
                        }
                        return <Ionicons name={iconName} size={20} color={color} />;
                    },
                    tabBarActiveTintColor: 'green',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle: { backgroundColor: 'lightgreen', paddingTop: 30 },
                    tabBarIndicatorStyle: { backgroundColor: 'darkgreen', height: 5 },
                })}>
                <Tab.Screen name="Home" component={Home}
                    options={{ title: 'Home' }}
                />
                {/* // TODO make about and account be a link from the side hamburger gear options  */}
                {/* <Tab.Screen name="About" component={About} options={{ title: 'About Grapes' }} /> */}
                {/* <Tab.Screen name="Account" component={Account} options={{ title: 'Account Settings & Preferences' }} /> */}
                {/* // TODO make edit and share be a link from individual letter */}
                {/* <Tab.Screen name="Edit" component={Edit} options={{ title: 'Edit a Letter' }} /> */}
                <Tab.Screen name="Global" component={Global} options={{ title: 'Global Feed' }} />
                {/* <Tab.Screen name="Share" component={Share} options={{ title: 'Share a Letter Globally' }} /> */}
                <Tab.Screen name="More" component={SettingsStackScreen} options={{ title: 'M🍇re' }} />
            </Tab.Navigator>
            <StatusBar style='auto' />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
