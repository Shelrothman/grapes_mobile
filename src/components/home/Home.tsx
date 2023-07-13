import { StyleSheet, Text, SafeAreaView, FlatList, View } from "react-native";
import * as grapes from '../../data/dummyGrapes.json';
// import { HomeGrapeDay } from './HomeGrapeDay';
// import { NativeStackScreenProps } from "@react-navigation/native-stack";

import GrapeLetterPage from "../my/Grape";


// TODO only render the last few days and then option to load more

export default function Home() {

    return (
        <SafeAreaView style={styles_home.container}>

            {/* <Text style={styles_home.title}>Today: {new Date().toDateString()}</Text> */}
            <GrapeLetterPage />
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
});
