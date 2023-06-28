import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


// import {
    // About,
    // About,
    // Edit, 
    // Share 
// } from './About';
// import { ParamListBase } from '@react-navigation/native';

import { About } from './About';
import { Account } from './Account';





// 🍇🍇🍇


/*
function SettingsScreen({ navigation }: any) { // TODO will need to use this similar logic for the linking of editing/sharing from the home page
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button
                title="About GRAPES™"
                onPress={() => navigation.navigate('About')}
            />
            <br />
            <Button
                title="Edit Account Settings & Preferences"
                onPress={() => navigation.navigate('Account')}
            />

        </View>
    );
}
const SettingsStack = createNativeStackNavigator<ParamListBase>()
*/

const Tab = createBottomTabNavigator();
export function SettingsStackScreen() {
    return (
        <Tab.Navigator
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
                    return <MaterialCommunityIcons name={iconName} size={20} color={color} />;
                },
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: 'lightgreen', paddingBottom: 20 },
                tabBarIndicatorStyle: { backgroundColor: 'darkgreen', height: 5 },
            })}>
            {/* <SettingsStack.Screen name="More" options={{title: "Settings and Information" }} component={SettingsScreen} /> */}
            <Tab.Screen name="About" component={About} options={{ title: 'About GRAPES™' }} />
            <Tab.Screen name="Account" component={Account} options={{ title: 'My Account' }} />
            {/* </SettingsStack.Navigator> */}
        </Tab.Navigator>
    );
}