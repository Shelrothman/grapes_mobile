import { Stack } from 'expo-router';



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

// in between Stack you should put all the screens that you want to be able to navigate to


const RootLayout = () => {
    return (
        // <Provider value={client}>
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="Global" options={{ headerShown: false }} />
        </Stack>
        // </Provider>
    );
};

export default RootLayout;