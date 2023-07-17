import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../auth/Login";
// import Register from "../auth/Register";
// import ForgetPassword from "../auth/ForgetPassword";



// ScreenComponentType<ParamListBase, "Login">;
import Register from "../auth/Register";
import ForgetPassword from "../auth/ForgetPassword";


// okay so i made it be "any" for the param type for the Register but itss still not shoing up on lcick it goest o forget... hmmmm must be somehting very simple that i am missing


const AuthStack = createNativeStackNavigator();
const Auth = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            {/* @ts-ignore */}
            <AuthStack.Screen name="Login" component={Login} />
            {/* @ts-ignore */}
            <AuthStack.Screen name="Register" component={Register} />
            {/* @ts-ignore */}
            <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />


        </AuthStack.Navigator>
    );
};

export default Auth;
