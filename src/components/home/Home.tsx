import { StyleSheet, Text, SafeAreaView, FlatList, View } from "react-native";
import * as grapes from '../../data/dummyGrapes.json';
import { HomeGrapeDay } from './HomeGrapeDay';



// TODO only render the last few days and then option to load more

export function Home() {

    return (
        <SafeAreaView style={styles_home.container}>
            <Text style={styles_home.title}>G.R.A.P.E.S</Text>
            <FlatList
                data={grapes.items}
                renderItem={({ item }) => <HomeGrapeDay grape={item} />}
                // renderItem={({ item }) => <Text>ItemItem</Text>}
                showsVerticalScrollIndicator={false}
                // style={{ marginLeft: 10, marginRight: 10 }}
            />
            {/* <HomeGrapeDay grape={grapes.items[0]} /> */}
        </SafeAreaView>
    );
}

// looks fine here without the HomeGrapeDay so we know its in that or it s children.. the issue

const styles_home = StyleSheet.create({
    container: {
        backgroundColor: '#2E3944',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#a8e4a0',
    },
});
