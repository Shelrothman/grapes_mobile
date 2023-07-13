import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SecondScreen from "../screens/SecondScreen";
import MainTabs from "./MainTabs";
// import GrapeLetterPage from "./my/Grape";
// import GrapeLetterPage from "../my/Grape";
import { MyGrapeProvider } from '../../contexts/MyGrapeContext';







const MainStack = createNativeStackNavigator();

// the one for MainTabs is the one that is being used in the app in this

const Main = () => {

    return (

        <MyGrapeProvider>
            <MainStack.Navigator screenOptions={{ headerShown: false, }} >

                <MainStack.Screen name="MainTabs" component={MainTabs} />
                {/* @ts-ignore */}
                <MainStack.Screen name="SecondScreen" component={SecondScreen} />
                {/* @ts-ignore */}
                {/* <MainStack.Screen name="Grape" component={GrapeLetterPage} options={{ headerShown: false }} /> */}
            </MainStack.Navigator>
        </MyGrapeProvider>
    );
};

export default Main;
