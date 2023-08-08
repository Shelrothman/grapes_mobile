import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgetPassword from "../auth/ForgetPassword";


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
