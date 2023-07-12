import { useNavigation } from 'expo-router';
import { useState, useLayoutEffect, SetStateAction } from 'react';
import { Home } from '../src/components/home/Home';
// import { useQuery } from 'urql';
import Toast from 'react-native-toast-message';
import { ToastConfig } from '../src/utils/ToastConfig';
import { StatusBar } from 'expo-status-bar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Ionicons } from '@expo/vector-icons';
import { Global } from '../src/components/global/Global';
import { SettingsStackScreen } from '../src/components/settings/SettingsStackScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createMaterialTopTabNavigator();





export default function HomePage() {

    const [ searchTerm, setSearchTerm ] = useState('');

    const navigation = useNavigation();

    // const [ response ] = useQuery({
    //     query: questionsQuery,
    //     variables: { sort: 'votes' },
    // });


    useLayoutEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions: {
                onChangeText: (event: { nativeEvent: { text: SetStateAction<string>; }; }) => setSearchTerm(event.nativeEvent.text),
                // onBlur: search,
                onblur: () => console.log('blur'),
            },
        });
    }, [ navigation, searchTerm, setSearchTerm ]);

    // if (response.fetching) {
    //     return (
    //         <SafeAreaView>
    //             <ActivityIndicator />
    //         </SafeAreaView>
    //     );
    // }
    // if (response.error) {
    //     return (
    //         <SafeAreaView>
    //             <Text>Error: {response.error.message}</Text>
    //         </SafeAreaView>
    //     );
    // }
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
                <Tab.Screen name="Home" component={Home} options={{ tabBarShowLabel: false }} />
                <Tab.Screen name="Global" component={Global} options={{ tabBarShowLabel: false }} />
                <Tab.Screen name="More" component={SettingsStackScreen} options={{ tabBarShowLabel: false }} />
            </Tab.Navigator>
            <StatusBar hidden={true} />
            <Toast config={ToastConfig} />
        </>
    )
}



