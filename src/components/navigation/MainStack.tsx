import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";
import { MyGrapeProvider } from '../../contexts/MyGrapeContext';







const MainStack = createNativeStackNavigator();


const Main = () => {

    return (
        <MyGrapeProvider>
            <MainStack.Navigator screenOptions={{ headerShown: false, }} >
                <MainStack.Screen name="MainTabs" component={MainTabs} />
            </MainStack.Navigator>
        </MyGrapeProvider>
    );
};

export default Main;
