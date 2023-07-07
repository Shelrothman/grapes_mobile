// import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
// import QuestionListItem from '../src/components/QuestionListItem';
import { useNavigation } from 'expo-router';
import { useState, useLayoutEffect, SetStateAction } from 'react';
import { Home } from '../src/components/Home';
// import { useQuery } from 'urql';


// ** right now it works goes to a dummy page but okay cool then just gotta do it for the sharing share by id and booya ya i can add ?params or somethuing.
// ** youre a derp its because i didnt DEFAULt export the page so it wasnt working.


import { StatusBar } from 'expo-status-bar';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


//  TODO change theser tioyse the ones from @expo and then uninstall this package
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


import { Global } from '../src/components/Global';
// import { Global } from './Global';
import { SettingsStackScreen } from '../src/components/SettingsStackScreen';


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
        let iconName: string = 'ios-information-circle-outline';
        const iconProps = { size: 20, color: color };
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
                    tabBarStyle: { backgroundColor: '#4E1E66', paddingTop: 30 },
                    tabBarIndicatorStyle: { backgroundColor: '#8ABD91', height: 5 },
                })}>
                <Tab.Screen name="Home" component={Home} options={{ title: 'Home' }} />
                <Tab.Screen name="Global" component={Global} options={{ title: 'Feed' }} />
                <Tab.Screen name="More" component={SettingsStackScreen} options={{ title: 'M🍇re' }} />
            </Tab.Navigator>
            <StatusBar 
            // style='auto'
            hidden={true} 
            />
        </>
    )
}



