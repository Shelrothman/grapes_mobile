import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";
import { HomeGrapeProvider } from "../../contexts/HomeGrapeContext";


const MainStack = createNativeStackNavigator();


const Main = () => {

    return (
        <HomeGrapeProvider>
            <MainStack.Navigator screenOptions={{ headerShown: false }} >
                <MainStack.Screen name="MainTabs" component={MainTabs} />
            </MainStack.Navigator>
        </HomeGrapeProvider>
    );
};

export default Main;
