import { Stack } from 'expo-router';
// TODO may need to only wrape the grape_id screen in the provider...

import { MyGrapeProvider } from '../src/contexts/MyGrapeContext';
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "react-native-rapi-ui";
import Navigation from "../src/components/navigation";
import { AuthProvider } from "../src/contexts/AuthProvider";


// TODO set up new Client here for urql to connect to supabase db of users and their grapes.
// import { Client, Provider, cacheExchange, fetchExchange } from 'urql';

// const client = new Client({
//     url: 'https://ainlegdah.stepzen.net/api/stackoverflowclone/__graphql',
//     exchanges: [ cacheExchange, fetchExchange ],
//     fetchOptions: {
//         headers: {
//             Authorization:
//                 'Apikey ainlegdah::stepzen.net+1000::ba61ee0d706cfebc52981be3f447fbb0ab941c541ea812702f91c1752a02626a',
//             'Content-Type': 'application/json',
//         },
//     },
// });

//* in between Stack you should put all the screens that you want to be able to navigate to and they will need to be default exports

// so.. everything that you want there to be a link to in the app needs to be in the stack navigator


const RootLayout = () => {

    const images = [
        require("../assets/images/login.png"),
        require("../assets/images/register.png"),
        require("../assets/images/forget.png"),
    ];

    // return (
    //     <MyGrapeProvider>
    //         <Stack>
    //             <Stack.Screen name="index" options={{ headerShown: false }} />
    //             <Stack.Screen name="Share" options={{ headerShown: false }} />
    //             <Stack.Screen name="Edit" options={{ headerShown: false }} />
    //             {/* i dont think we need one for the grape_id... */}
    //             <Stack.Screen name="[grape_id]" options={{ headerShown: false }} />
    //         </Stack >
    //     </MyGrapeProvider>
    // );
    return (
        <ThemeProvider images={images}>
            <AuthProvider>
                <Navigation />
            </AuthProvider>
            <StatusBar hidden={true} />
        </ThemeProvider>
    );
};


// const styles_root = StyleSheet.create({
//     container: {
//         paddingTop: 50,
//         flex: 1,
//     },
// });


export default RootLayout