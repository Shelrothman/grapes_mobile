import { useState } from "react";
import { history_styles } from "../../styles/history";
import { Text, SafeAreaView, FlatList, View, Button, Pressable, NativeScrollEvent } from "react-native";
import { HistoryGrapeDay } from './GrapeDay';
import { buildDateArray, isCloseToBottom } from "../../utils";
import { GrapeDayLetter } from "../../types";
import { Ionicons } from '@expo/vector-icons';

//!! TODO move to in here! 



/** 
 * @description users history page of their past grape days
 */
export default function History() {
    const [ dates, setDates ] = useState<string[]>(buildDateArray());
    const [ expandedDay, setExpandedDay ] = useState<GrapeDayLetter[] | null>(null);
    const [ loadMoreVisibility, setLoadMoreVisibility ] = useState<boolean>(false);
    const [ viewingDate, setViewingDate ] = useState<string | null>(null);
    const [ noMoreVisibility, setNoMoreVisibility ] = useState<boolean>(false);

    const handleOnScroll = (nativeEvent: NativeScrollEvent) => {
        if (isCloseToBottom(nativeEvent)) {
            setLoadMoreVisibility(true);
        } else {
            setLoadMoreVisibility(false);
            setNoMoreVisibility(false);
        }
    };

    const handlePressLoadMore = () => {
        if (dates.length >= 28) {
            setNoMoreVisibility(true);
            return setLoadMoreVisibility(false);
        }
        setDates([ ...dates, ...buildDateArray(dates[ dates.length - 1 ]) ]);
        setLoadMoreVisibility(false);
    };

    return (
        <SafeAreaView style={history_styles.container}>
            <View style={history_styles.title_container}>
                <Text style={history_styles.title}>My Past G.R.A.P.E.S.</Text>
            </View>
            <FlatList
                data={dates.map(date => ({ created_at: date, day: expandedDay }))}
                renderItem={({ item }) => {
                    const _props = {
                        date: item.created_at, setGrape_date: setViewingDate,
                        key: item.created_at, setDay: setExpandedDay
                    };
                    if (viewingDate && item.created_at === viewingDate) {
                        return <HistoryGrapeDay {..._props} day={expandedDay} />;
                    }
                    return <HistoryGrapeDay {..._props} day={null} />;
                }}
                showsVerticalScrollIndicator={false}
                onScroll={({ nativeEvent }) => handleOnScroll(nativeEvent)}
                alwaysBounceVertical={false} bounces={false} // No flickering!
            />
            <Pressable style={{ display: loadMoreVisibility === true ? 'flex' : 'none', ...history_styles.load_container }}
                onPress={() => handlePressLoadMore()}>
                <Text><Ionicons name="md-cloud-download" size={24} color="#2E3944" />{' '}Load More</Text>
            </Pressable>
            <Text style={{
                ...history_styles.load_container,
                display: noMoreVisibility === true ? 'flex' : 'none'
            }}>
                Grape data is not saved past 1 month to protect your privacy.
            </Text>
        </SafeAreaView>
    );
}