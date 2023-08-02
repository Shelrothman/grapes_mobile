import { About } from './About';
import { Account } from './Account';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';



const Tab = createMaterialTopTabNavigator();
export function SettingsStackScreen() {
    return (
        <Tab.Navigator sceneContainerStyle={{backgroundColor: '#2E3944'}}
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
                tabBarActiveTintColor: 'darkgreen',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: '#a8e4a0', paddingTop: 0 },
                tabBarItemStyle: { padding: 5 },
                tabBarIndicatorStyle: { backgroundColor: 'darkgreen', height: 5 },
            })}>
            <Tab.Screen name="About" component={About} options={{ title: 'About GRAPES™', swipeEnabled: false }} />
            <Tab.Screen name="Account" component={Account} options={{ title: 'My Account', swipeEnabled: false }} />
        </Tab.Navigator>
    );
}
