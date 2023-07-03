import { StyleSheet, Text, SafeAreaView, FlatList, View } from "react-native";
import * as grapes from '../data/dummyGrapes.json';
import { HomeGrapeDay } from './HomeGrapeDay';

// ! something really weird is happenign as i scroll onteh phone it like grows...
// try wrappng with virwe


// TODO only render the last few days and then option to load more

export function Home() {

    return (
        <SafeAreaView style={styles_home.container}>
            <Text style={styles_home.title}>G.R.A.P.E.S</Text>
            {/* <Text>G:{GD.g} R:{GD.r} A:{GD.a} P:{GD.p} E:{GD.e} S:{GD.s} </Text> */}
            {/* <View> */}
                <FlatList
                    data={grapes.items}
                    renderItem={({ item }) => <HomeGrapeDay grape={item} />}
                    showsVerticalScrollIndicator={false}
                />
            {/* </View> */}
        </SafeAreaView>
    );
}


const styles_home = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#889CAF',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    title: {
        // fontSize: 20,
        fontWeight: 'bold',
        color: '#4E1E66',
    },
});
