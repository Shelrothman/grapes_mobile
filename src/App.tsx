import { StatusBar } from "expo-status-bar";
import Navigation from "./components/navigation";
import { AuthProvider } from "./contexts/AuthProvider";
import Toast from 'react-native-toast-message';
import { ToastConfig } from './utils/ToastConfig';



export default function App() {
    // const images = [
    //     require("../assets/images/login.png"),
    //     require("../assets/images/register.png"),
    //     require("../assets/images/forget.png"),
    // ];

    return (
        <AuthProvider>
            <Navigation />
            <StatusBar hidden={true} />
            <Toast config={ToastConfig} />
        </AuthProvider>
    );
}
