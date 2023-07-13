// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { themeColor, useTheme } from "react-native-rapi-ui";
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import TabBarIcon from "../components/utils/TabBarIcon";
// import TabBarIcon from "../../utils/TabBarIcon";
// import TabBarText from "../components/utils/TabBarText";
// import TabBarText from "../../utils/TabBarText";
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { ToastConfig } from '../../utils/ToastConfig';
import Home from "../home/Home";
// import About from "../screens/About";
// import Profile from "../screens/Profile";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SettingsStackScreen } from "../settings/SettingsStackScreen";
import { Global } from "../global/Global";

const Tab = createMaterialTopTabNavigator();

const MainTabs = () => {
    const { isDarkmode } = useTheme();

    const buildTabBarIcon = (routeName: string, focused: boolean, color: string) => {
        let iconName: any = '';
        const iconProps = { size: 25, color: color };
        if (routeName === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
        } else if (routeName === 'Global') {
            iconName = focused ? 'earth' : 'earth-outline';
        } else if (routeName === 'More') {
            iconName = focused ? 'fruit-grapes' : 'fruit-grapes-outline';
            return <MaterialCommunityIcons name={iconName} {...iconProps} />;
        }
        return <Ionicons name={iconName} {...iconProps} />;
    };

    return (
        <>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color }) => {
                        if (route.name) return buildTabBarIcon(route.name, focused, color);
                    },
                    // headerShown: route.name === 'Home' ? false : true,
                    tabBarActiveTintColor: '#8ABD91',
                    tabBarInactiveTintColor: '#f3f0f5', // text color for words that are not selected
                    tabBarStyle: { backgroundColor: '#4E1E66', paddingTop: 30, paddingBottom: 10 },
                    tabBarIndicatorStyle: { backgroundColor: '#cb9de2', height: 5 },
                })}>

                    {/* @ts-ignore */}
                <Tab.Screen name="Home" component={Home} options={{ tabBarShowLabel: false }} />
                <Tab.Screen name="Global" component={Global} options={{ tabBarShowLabel: false }} />
                <Tab.Screen name="More" component={SettingsStackScreen} options={{ tabBarShowLabel: false }} />
            </Tab.Navigator>
            {/* <StatusBar hidden={true} /> */}
            <Toast config={ToastConfig} />
        </>
    );
};

export default MainTabs;
