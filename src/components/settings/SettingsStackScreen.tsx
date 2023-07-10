import { View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { About } from './About';
import { Account } from './Account';







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
            <Tab.Screen name="About" component={About} options={{ title: 'About GRAPES™', headerShown: false }} />
            <Tab.Screen name="Account" component={Account} options={{ title: 'My Account', headerShown: false }} />
            {/* </SettingsStack.Navigator> */}
        </Tab.Navigator>
    );
}