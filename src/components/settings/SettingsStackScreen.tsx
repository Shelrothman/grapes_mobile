import { About } from './About';
import { Account } from './Account';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';


const Tab = createMaterialTopTabNavigator();
export function SettingsStackScreen() {

    const { height, width } = useWindowDimensions();
    // todo: there is an issue where there appears some inner padding on the Account screen but i cannot for hte life of me figure out where it is coming from i have looked through all the params and they are saetup just lije the other screens
    // * it only happens in ios aand not in the web version

    return (
        <Tab.Navigator
            sceneContainerStyle={{ backgroundColor: '#1a1e47' }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName: any = 'information-circle-outline';
                    if (route.name) {
                        if (route.name === 'Account') {
                            iconName = focused ? 'account-settings' : 'account-settings-outline';
                            return <MaterialCommunityIcons name={iconName} size={25} color={color} />;
                        } else if (route.name === 'About') {
                            iconName = focused ? 'information-circle' : 'information-circle-outline';
                        }
                    }
                    return <Ionicons name={iconName} size={25} color={color} />;
                },
                tabBarActiveTintColor: '#608a5c',
                tabBarInactiveTintColor: '#85a3ad',
                tabBarStyle: {
                    backgroundColor: '#a8e4a0',
                    paddingTop: height * 0.05,
                    fontFamily: 'Body-Reg',
                },
                tabBarIndicatorStyle: { backgroundColor: '#608a5c', height: 5 },
            })}>
            <Tab.Screen name="About" component={About} options={{ title: 'About GRAPES™', swipeEnabled: false }} />
            <Tab.Screen name="Account" component={Account} options={{ title: 'My Account', swipeEnabled: false }} />
        </Tab.Navigator>
    );
}
