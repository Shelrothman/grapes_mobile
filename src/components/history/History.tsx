import { useState } from "react";
import { history_styles } from "../../styles/history";
import { Text, SafeAreaView, FlatList, View } from "react-native";
import * as grapes from '../../data/dummyGrapes.json';
import { HistoryGrapeDay } from './GrapeDay';
import { buildDateArray } from "../../utils";
import { GrapeDayLetter } from "../../types";


// TODO the logic and display of the load more button




const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};



/** 
 * @description users history page of their past grape days
 */
export default function History() {

    const [ dates, setDates ] = useState<string[]>(buildDateArray());
    /** the expanded day being viewed */
    const [ day, setDay ] = useState<GrapeDayLetter[] | null>(null);
    /** state flagging if the "loadmore" should be visible */
    const [ loadMoreVisibility, setLoadMoreVisibility ] = useState<boolean>(false);

    /** the grape date of the grape day being viewed */
    const [ grape_date, setGrape_date ] = useState<string | null>(null);


    return (
        <SafeAreaView style={history_styles.container}>
            <View style={history_styles.title_container}>
                <Text style={history_styles.title}>My Past G.R.A.P.E.S</Text>
            </View>
            <FlatList
                data={dates.map(date => ({ created_at: date, grape_id: "fpp", day: day }))}
                renderItem={({ item }) => {
                    const _props = {
                        date: item.created_at,
                        setGrape_date: setGrape_date,
                        key: item.created_at,
                        setDay: setDay,
                    };
                    if (grape_date && item.created_at === grape_date) {
                        return <HistoryGrapeDay {..._props} day={day} />;
                    }
                    return <HistoryGrapeDay {..._props} day={null} />;
                }}
                showsVerticalScrollIndicator={false}
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) setLoadMoreVisibility(true);
                    else setLoadMoreVisibility(false);
                }}
            />
            <Text style={{ display: loadMoreVisibility === true ? 'flex' : 'none' }}>
                Load More Button here
            </Text>
        </SafeAreaView>
    );
}