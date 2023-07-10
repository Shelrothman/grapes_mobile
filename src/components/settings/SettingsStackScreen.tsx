import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { About } from './About';
import { Account } from './Account';







const Tab = createBottomTabNavigator();
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
                tabBarStyle: { backgroundColor: '#a8e4a0', height: '15%', padding: 5 },
                tabBarItemStyle: { padding: 5 },
                // tabBarIconStyle: { padding: 5 },
                tabBarIndicatorStyle: { backgroundColor: 'blue' },
            })}>
            {/* <SettingsStack.Screen name="More" options={{title: "Settings and Information" }} component={SettingsScreen} /> */}
            <Tab.Screen name="About" component={About} options={{ title: 'About GRAPES™', headerShown: false }} />
            <Tab.Screen name="Account" component={Account} options={{ title: 'My Account', headerShown: false }} />
            {/* </SettingsStack.Navigator> */}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2E3944',
        // height: '100%',
        paddingBottom: 20,
        // marginBottom: 20,
    },
    // tabBarStyle: {
    //     backgroundColor: '#a8e4a0',
    // }
});