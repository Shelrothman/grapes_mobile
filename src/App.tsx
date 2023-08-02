import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "react-native-rapi-ui";
import Navigation from "./components/navigation";
import { AuthProvider } from "./contexts/AuthProvider";
import Toast from 'react-native-toast-message';
import { ToastConfig } from './utils/ToastConfig';



export default function App() {
    const images = [
        require("../assets/images/login.png"),
        require("../assets/images/register.png"),
        require("../assets/images/forget.png"),
    ];

    const fonts = { "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf") };

    return (
        <ThemeProvider images={images} fonts={fonts}>
            <AuthProvider>
                <Navigation />
            </AuthProvider>
            <StatusBar hidden={true} />
            <Toast config={ToastConfig} />
        </ThemeProvider>
    );
}
