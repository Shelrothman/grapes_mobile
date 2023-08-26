import React, { useState, useEffect } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, SafeAreaView, FlatList, Pressable, NativeScrollEvent, RefreshControl, ScrollView } from 'react-native';
import { SharedLetter } from './SharedLetter';
import { GlobalService } from '../../services/GlobalService';;
import { SharedLetterUI } from '../../types';
import { global_styles } from '../../styles/global';
import Loading from '../../utils/Loading';
import { copyToClipboard } from '../../utils';
import { Ionicons } from '@expo/vector-icons';
import { isCloseToBottom } from '../../utils';


export function Global() {
    const [ globalData, setGlobalData ] = useState<SharedLetterUI[] | null>(null);
    const [ isInitialLoading, setIsInitialLoading ] = useState(true);
    const [ isMoreLoading, setIsMoreLoading ] = useState(false);
    const [ refreshing, setRefreshing ] = useState(false);

    const [ loadMoreVisibility, setLoadMoreVisibility ] = useState<boolean>(false);
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ bottomText, setBottomText ] = useState<string>(' Load More');
    const [ disableLoadMore, setDisableLoadMore ] = useState<boolean>(false);
    const [ maxLength, setMaxLength ] = useState<number>(10);
    const globalService = new GlobalService();

    useFocusEffect( // * this runs only when the screen is refocused
        React.useCallback(() => {
            fetchData().then(() => setIsInitialLoading(false));
            return () => { resetPage() }; // TODO remove this need and just have user pull down to refresh
        }, [])
    );


    const onRefresh = React.useCallback(() => {
        // TODO caching would be nice here
        setIsInitialLoading(true);
        setRefreshing(true);
        fetchData().finally(() => {
            setRefreshing(false);
            setIsInitialLoading(false);
        });
    }, []);

    function resetPage() {
        // setGlobalData(null);
        setCurrentPage(1);
        setBottomText(' Load More');
        setDisableLoadMore(false);
        setMaxLength(10);
        setLoadMoreVisibility(false);
    }

    async function fetchData() {
        try {
            const response = await globalService.getLastTenRows(); // get ten most recent
            setGlobalData(response);
            const maxCount = await globalService.getTotalRows();
            setMaxLength(maxCount);
        } catch (error) {
            setIsInitialLoading(false);
            console.error('Error fetching data:', error);
        }
    };

    const handleOnScroll = (nativeEvent: NativeScrollEvent) => {
        if (maxLength <= globalData!.length) return setLoadMoreVisibility(false);
        if (isCloseToBottom(nativeEvent)) return setLoadMoreVisibility(true);
        else return setLoadMoreVisibility(false);
    };

    async function fetchNextSet() {
        try {
            const response = await globalService.getAllRowsWithPagination(10, currentPage);
            if (!response || response.length < 1) return;
            return setGlobalData([ ...globalData ? globalData : [], ...(response as SharedLetterUI[]) ]);
        } catch (error) {
            setIsMoreLoading(false);
            console.error('Error fetching data:', error);
        }
    };

    const handlePressLoadMore = () => {
        if (maxLength >= globalData!.length) {
            setIsMoreLoading(true);
            fetchNextSet().then(() => {
                setCurrentPage((prev) => prev + 1);
            }).finally(() => {
                setIsMoreLoading(false);
                setLoadMoreVisibility(false);
            });
        } else {
            setDisableLoadMore(true);
            setLoadMoreVisibility(false);
        }
    };


    return (
        <SafeAreaView style={global_styles.global_container}>
            <View style={global_styles.title_container}>
                <Text style={global_styles.title}>Global Feed (inspiration)</Text>
            </View>
            <View style={{ paddingBottom: 20, marginBottom: 20 }}>
                {isInitialLoading ? <Loading /> : (
                    <FlatList
                        data={globalData ? globalData : []}
                        renderItem={({ item }) => <SharedLetter {...item} onCopyClick={copyToClipboard} />}
                        showsVerticalScrollIndicator={false}
                        onScroll={({ nativeEvent }) => handleOnScroll(nativeEvent)}
                        alwaysBounceVertical={false}
                        // bounces={false} have to disable so refresh control works
                        scrollEnabled={!isMoreLoading}
                        keyExtractor={(item, index) => item.id.toString()}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    />
                )}
                {!disableLoadMore && (
                    <Pressable
                        style={{ display: loadMoreVisibility ? 'flex' : 'none', ...global_styles.load_container }}
                        onPress={() => handlePressLoadMore()} disabled={isMoreLoading}
                    >
                        {isMoreLoading ? <Text>Loading...</Text> : (
                            <Text><Ionicons name="md-cloud-download" size={24} color="#1a1e47" />{bottomText}</Text>
                        )}
                    </Pressable>
                )}
            </View>
        </SafeAreaView>
    )
}