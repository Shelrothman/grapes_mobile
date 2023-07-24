/** 
 * @description users history of past grape days
 */

import { StyleSheet, Text, SafeAreaView, FlatList, View } from "react-native";
import * as grapes from '../../data/dummyGrapes.json';
import { HomeGrapeDay as HistoryGrapeDay } from './GrapeDay';
// import { NativeStackScreenProps } from "@react-navigation/native-stack";

// TODO only display the date of the grape and then on press of that, they can see the full grape day

// TODO only render the last few days and then option to load more
// * ensure it only starts fetching if this tab is pulled up and not anywhere else in the app


export default function History() {

    return (
        <SafeAreaView style={styles_home.container}>
            <View style={styles_home.title_container}>
                <Text style={styles_home.title}>My Past G.R.A.P.E.S</Text>
            </View>
            <FlatList
                data={grapes.items}
                renderItem={({ item }) => <HistoryGrapeDay grape={item} />}
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
    title_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
});
