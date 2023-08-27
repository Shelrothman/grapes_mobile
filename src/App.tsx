import { StatusBar } from "expo-status-bar";
import Navigation from "./components/navigation";
import { AuthProvider } from "./contexts/AuthProvider";
import Toast from 'react-native-toast-message';
import { ToastConfig } from './utils/ToastConfig';
import { ThemeProvider } from "react-native-rapi-ui";
import Loading from "./utils/Loading";


export default function App() {
    // const images = [
    //     require("../assets/images/login.png"),
    //     require("../assets/images/register.png"),
    //     require("../assets/images/forget.png"),
    // ];

    //! PU HERE and continue setting up the fonts globally JUST need to do history page


    const GRAPE_FONTS = {
        "Body-Reg": require("./assets/fonts/Nunito-Regular.ttf"),
        "Grape-Header-a": require("./assets/fonts/Nunito-Black.ttf"),
        "Grape-Header-b": require("./assets/fonts/Nunito-Bold.ttf"),
        "Screen-Header": require("./assets/fonts/Nunito-Light.ttf"),
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
