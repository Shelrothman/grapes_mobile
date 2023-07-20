import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "react-native-rapi-ui";
import Navigation from "./components/navigation";
import { AuthProvider } from "./contexts/AuthProvider";

// TODO come back and re-asses whats really needed here

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
        </ThemeProvider>
    );
}
