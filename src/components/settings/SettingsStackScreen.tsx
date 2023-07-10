import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { About } from './About';
import { Account } from './Account';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


// * dang this should really be a top nav and not bottom so THat  it like flows with the rest of the app



const Tab = createMaterialTopTabNavigator();
export function SettingsStackScreen() {
    return (
        <Tab.Navigator sceneContainerStyle={styles.container}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName: string = 'ios-information-circle-outline';
                    if (route.name) {
                        if (route.name === 'Account') {
                            iconName = focused ? 'account-settings' : 'account-settings-outline';
                        } else if (route.name === 'About') {
                            iconName = focused ? 'information' : 'information-outline';
                        }
                    }
                    return <MaterialCommunityIcons name={iconName} size={25} color={color} />;
                },
                tabBarActiveTintColor: 'darkgreen',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: '#a8e4a0', paddingTop: 0 },
                tabBarItemStyle: { padding: 5 },
                tabBarIndicatorStyle: { backgroundColor: 'darkgreen', height: 5 },
            })}>
            <Tab.Screen name="About" component={About} options={{ title: 'About GRAPES™', }} />
            <Tab.Screen name="Account" component={Account} options={{ title: 'My Account', }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2E3944',
        // height: '100%',
        // paddingBottom: 20,
        // marginBottom: 20,
    },
});