import { useCallback } from 'react';
import { StatusBar } from "expo-status-bar";
import Navigation from "./components/navigation";
import { AuthProvider } from "./contexts/AuthProvider";
import Toast from 'react-native-toast-message';
import { ToastConfig } from './utils/ToastConfig';
import { useFonts } from 'expo-font';

// SplashScreen.preventAutoHideAsync(); // prevent from hiding before the fonts are loaded

//* <Text style={{ fontFamily: 'Inter-Black', fontSize: 30 }}>Inter Black</Text>

export default function App() {
    // const images = [
    //     require("../assets/images/login.png"),
    //     require("../assets/images/register.png"),
    //     require("../assets/images/forget.png"),
    // ];

    // const [ fontsLoaded ] = useFonts({
    //     // 'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
    //     'Body-Grapes': require('./assets/fonts/Nunito-Light.ttf'),
    // });

    // const onLayoutRootView = useCallback(async () => {
    //     if (fontsLoaded) {
    //         await SplashScreen.hideAsync();
    //     }
    // }, [ fontsLoaded ]);

    // if (!fontsLoaded) {
    //     return null;
    // }

    return (
        <AuthProvider>
            <Navigation />
            <StatusBar style="light" />
            <Toast config={ToastConfig} />
        </AuthProvider>
    );
}
