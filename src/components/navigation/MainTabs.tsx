import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import HomeComponent from "../my/HomeComponent";
import History from "../history/History";
import { SettingsStackScreen } from "../settings/SettingsStackScreen";
import { Global } from "../global/Global";
import { MaterialIcons } from '@expo/vector-icons'; // not filled
import { FontAwesome } from '@expo/vector-icons'; // filled
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();



// * disable swiping everywhere so it doesn't confuse people

const MainTabs = () => {
    const buildTabBarIcon = (routeName: string, focused: boolean, color: string) => {
        const iconProps = { size: 25, color: color };
        if (routeName === 'Home') {
            return <Ionicons name={`${focused ? 'home' : 'home-outline'}`} {...iconProps} />;
        } else if (routeName === 'Global') {
            return <Ionicons name={`${focused ? 'earth' : 'earth-outline'}`} {...iconProps} />;
        } else if (routeName === 'More') {
            return <MaterialCommunityIcons name={`${focused ? 'fruit-grapes' : 'fruit-grapes-outline'}`} {...iconProps} />;
        } else if (routeName === 'History') {
            if (focused) return <FontAwesome name="history" {...iconProps} />;
            return <MaterialIcons name="history" {...iconProps} />;
        }
    };


    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    if (route.name) return buildTabBarIcon(route.name, focused, color);
                },
            })}
            labeled={false}
            activeColor='#4E1E66'
            inactiveColor='#f3f0f5'
            // TODO make the height dynamic
            barStyle={{ height: 100, backgroundColor: '#1a1e47', borderTopColor: '#474115', borderTopWidth: 2, }}
        >
            <Tab.Screen name="Home" component={HomeComponent} />
            <Tab.Screen name="Global" component={Global} />
            <Tab.Screen name="More" component={SettingsStackScreen} />
            <Tab.Screen name="History" component={History} />
        </Tab.Navigator>
    );
};

export default MainTabs;
