import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";
import { MyGrapeProvider } from '../../contexts/MyGrapeContext';
import { useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";






const MainStack = createNativeStackNavigator();


const Main = () => {

    // useLayoutEffect(() => {
    //     const routeName = getFocusedRouteNameFromRoute(route);
    //     console.log('routeName', routeName)
    //     // if (routeName === "Home") {
    //     //     navigation.setOptions({ tabBarVisible: false });
    //     // } else {
    //     //     navigation.setOptions({ tabBarVisible: true });
    //     // }
    // }, [ navigation, route ]);

    return (
        <MyGrapeProvider>
            <MainStack.Navigator screenOptions={{ headerShown: false, }} >
                <MainStack.Screen name="MainTabs" component={MainTabs} />
            </MainStack.Navigator>
        </MyGrapeProvider>
    );
};

export default Main;
