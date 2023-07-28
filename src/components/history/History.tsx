/** 
 * @description users history of past grape days
 */

import { history_styles } from "../../styles/history";
import { Text, SafeAreaView, FlatList, View } from "react-native";
import * as grapes from '../../data/dummyGrapes.json';
import { HistoryGrapeDay } from './GrapeDay';
// import { NativeStackScreenProps } from "@react-navigation/native-stack";

// TODO only display the date of the grape and then on press of that, they can see the full grape day

// TODO only render the last few days and then option to load more
// * ensure it only starts fetching if this tab is pulled up and not anywhere else in the app
// do this in global feed also...


export default function History() {

    return (
        <SafeAreaView style={history_styles.container}>
            <View style={history_styles.title_container}>
                <Text style={history_styles.title}>My Past G.R.A.P.E.S</Text>
            </View>
            <FlatList
                data={grapes.items}
                renderItem={({ item }) => <HistoryGrapeDay grape={item} />}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}