import { useState } from "react";
import { history_styles } from "../../styles/history";
import { Text, SafeAreaView, FlatList, View } from "react-native";
import * as grapes from '../../data/dummyGrapes.json';
import { HistoryGrapeDay } from './GrapeDay';
import { buildDateArray } from "../../utils";
import { GrapeDayLetter } from "../../types";

// TODO only one opened at a time so when a new one opens, the other closes

/** 
 * @description users history page of their past grape days
 */
export default function History() {

    const [ dates, setDates ] = useState<string[]>([...buildDateArray(), 'Load More Button']);
    /** the expanded day being viewed */
    const [ viewLetters, setViewLetters ] = useState<GrapeDayLetter[] | null>(null);




    return (
        <SafeAreaView style={history_styles.container}>
            <View style={history_styles.title_container}>
                <Text style={history_styles.title}>My Past G.R.A.P.E.S</Text>
            </View>
            <FlatList
                // data={grapes.items}
                data={dates.map(date => ({ creation_date: date, grape_id: "fpp", day: viewLetters }))}
                renderItem={({ item }) => <HistoryGrapeDay 
                    date={item.creation_date}
                    grape_id={item.grape_id}
                    day={item.day}
                    setDay={setViewLetters}
                />}
                showsVerticalScrollIndicator={false}
            />
            <Text>Load More Button here</Text>
        </SafeAreaView>
    );
}