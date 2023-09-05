import { StatusBar } from "expo-status-bar";
import Navigation from "./components/navigation";
import { AuthProvider } from "./contexts/AuthProvider";
import Toast from 'react-native-toast-message';
import { ToastConfig } from './utils/ToastConfig';
import { ThemeProvider } from "react-native-rapi-ui";
import Loading from "./utils/Loading";


export default function App() {

    const GRAPE_FONTS = {
        "Body-Reg": require("./assets/fonts/Nunito-Regular.ttf"),
        "Grape-Header-a": require("./assets/fonts/Nunito-Black.ttf"),
        "Grape-Header-b": require("./assets/fonts/Nunito-Bold.ttf"),
        "Screen-Header": require("./assets/fonts/Nunito-Black.ttf"),
        "Reg-Italic": require("./assets/fonts/Nunito-Italic.ttf"),
        "Bold-Italic": require("./assets/fonts/Nunito-BoldItalic.ttf"),
    };


    return (
        <ThemeProvider fonts={GRAPE_FONTS} loading={<Loading />}>
            <AuthProvider>
                <Navigation />
                <StatusBar style="light" />
                <Toast config={ToastConfig} />
            </AuthProvider>
        </ThemeProvider>
    );
}
