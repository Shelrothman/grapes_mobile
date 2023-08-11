import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Home from "../my/Home";
import History from "../history/History";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SettingsStackScreen } from "../settings/SettingsStackScreen";
import { Global } from "../global/Global";
import { MaterialIcons } from '@expo/vector-icons'; // not filled
import { FontAwesome } from '@expo/vector-icons'; // filled
import { useHomeGrapeContext } from '../../contexts/HomeGrapeContext';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const Tab = createMaterialTopTabNavigator();




// * disable swiping everywhere so it doesnt confuse people
const tabBarOptions = { tabBarShowLabel: false, swipeEnabled: false, };

const MainTabs = () => {
    const { tabBarEnabled } = useHomeGrapeContext();
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
                tabBarActiveTintColor: '#8ABD91',
                tabBarInactiveTintColor: '#f3f0f5', // text color for words that are not selected
                tabBarStyle: {
                    backgroundColor: '#4E1E66', paddingTop: 50, paddingBottom: 10,
                    display: `${tabBarEnabled ? 'flex' : 'none'}`
                },
                tabBarIndicatorStyle: { backgroundColor: '#cb9de2', height: 5 },
            })}>
            <Tab.Screen name="Home" component={Home}
                options={tabBarOptions}
            />
            <Tab.Screen name="Global" component={Global}
                options={tabBarOptions}
            />
            <Tab.Screen name="More" component={SettingsStackScreen}
                options={tabBarOptions}
            />
            <Tab.Screen name="History" component={History}
                options={tabBarOptions}
            />
        </Tab.Navigator>
    );
};

export default MainTabs;
