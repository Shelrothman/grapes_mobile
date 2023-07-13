import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "react-native-rapi-ui";
import Navigation from "./components/navigation";
import { AuthProvider } from "./contexts/AuthProvider";

export default function App() {
    const images = [
        require("../assets/images/login.png"),
        require("../assets/images/register.png"),
        require("../assets/images/forget.png"),
    ];
    return (
        <ThemeProvider images={images}>
            <AuthProvider>
                <Navigation />
            </AuthProvider>
            <StatusBar hidden={true} />
        </ThemeProvider>
    );
}
