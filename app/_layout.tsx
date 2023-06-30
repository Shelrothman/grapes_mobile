import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

/*
okay.. link on one,, one of the grapes to just that grape day

then the user goes through the editig

form ttheir u can share or edit etc...

but this way the home page is for viewing whihc  is good for it to be a vuisual reminder for peeple throughout the day and to use for a widget in furture

and the Grape page is for editing and sharing
only can edit the current day

if an older one, you can still share a letter

and the global feed is still of all the letters shared from all the users

* screens with links: share, edit, grape id
    ?  grape_id -> share | edit + grape id as params

    ? home -> grape_id + grape id as params

* screens without links: global, home, Settings+

* tabs -> top 3 Home, Global, Settings+
    ? Settings -> 2 bottom tabs: About, Account



*/



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
    return (
        // <Provider value={client}>
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="Share" options={{ headerShown: false }} />
            <Stack.Screen name="Edit" options={{ headerShown: false }} />
            {/* i dont think we need one for the grape_id... */}
            <Stack.Screen name="[grape_id]" options={{ headerShown: false }} />
        </Stack>
        // </Provider>
    );
};


// const styles_root = StyleSheet.create({
//     container: {
//         paddingTop: 50,
//         flex: 1,
//     },
// });


export default RootLayout