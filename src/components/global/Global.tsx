import React, { useState, useEffect } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, SafeAreaView, FlatList, Pressable, NativeScrollEvent } from 'react-native';
import { SharedLetter } from './SharedLetter';
import { GlobalService } from '../../services/GlobalService';;
import { RawSharedLetter } from '../../types';
import { global_styles } from '../../styles/global';
import Loading from '../../utils/Loading';
import { copyToClipboard } from '../../utils';
import { Ionicons } from '@expo/vector-icons';
import { isCloseToBottom } from '../../utils';
// TODO this in Global also.. the load just ten and then load more if they want more... 
// TODO: pagination and limit the amount returning. so only return 10 or so at a time. uyntil they scroll down.

//!! OU uin here it still looks allittle buggy... so maybe rethink design or idlk


export function Global() {
    const [ globalData, setGlobalData ] = useState<RawSharedLetter[] | null>(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ loadMoreVisibility, setLoadMoreVisibility ] = useState<boolean>(false);
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ bottomText, setBottomText ] = useState<string>(' Load More');
    // const [refetchLoading, setRefetchLoading] = useState<boolean>(false);
    const [ disableLoadMore, setDisableLoadMore ] = useState<boolean>(false);
    const globalService = new GlobalService();


    // useEffect(() => {
    //     console.log('currentPageChange:', currentPage);
    // }, [ currentPage ])

    // * this runs only when the screen is refocused 
    useFocusEffect(
        React.useCallback(() => {
            fetchData().then(() => setIsLoading(false));
            return () => {
                setGlobalData(null);
                setIsLoading(true);
                setCurrentPage(1);
                setBottomText(' Load More');
                setDisableLoadMore(false);
            };
        }, [])
    );

    async function fetchData() {
        try {
            const response = await globalService.getLastTenRows(); // get ten most recent
            setGlobalData(response);
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching data:', error);
        }
    };

    const handleOnScroll = (nativeEvent: NativeScrollEvent) => {
        if (isCloseToBottom(nativeEvent)) setLoadMoreVisibility(true);
        else setLoadMoreVisibility(false);
    };

    async function fetchNextSet() {
        try {
            const response = await globalService.getAllRowsWithPagination(10, currentPage);
            // setCurrentPage((prev) => prev + 1);
            if (response && response.length < 1) return false;
            else {
                setGlobalData([ ...globalData ? globalData : [], ...(response as RawSharedLetter[]) ]);
                return true;
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching data:', error);
        }
    };

    const handlePressLoadMore = () => {
        setIsLoading(true);
        fetchNextSet().then((res) => {
            if (!res) { // then there are no more rows to fetch
                setDisableLoadMore(true);
            } else {
                setCurrentPage((prev) => prev + 1);
            }
        }).finally(() => setIsLoading(false));
    };



    return (
        <SafeAreaView style={global_styles.global_container}>
            <View style={global_styles.title_container}>
                <Text style={global_styles.title}>Global Feed (inspiration)</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
                {isLoading ? <Loading /> : (
                    <FlatList
                        data={globalData ? globalData : []}
                        renderItem={({ item }) => <SharedLetter {...item} onCopyClick={copyToClipboard} />}
                        showsVerticalScrollIndicator={false}
                        onScroll={({ nativeEvent }) => handleOnScroll(nativeEvent)}
                        alwaysBounceVertical={false} bounces={false}
                    />
                )}
                {!disableLoadMore && (
                    <Pressable style={{ display: loadMoreVisibility === true ? 'flex' : 'none', ...global_styles.load_container }}
                        onPress={() => handlePressLoadMore()} disabled={disableLoadMore}
                    >
                        {isLoading ? <Text>Loading...</Text> : (
                            <Text><Ionicons name="md-cloud-download" size={24} color="#2E3944" />{bottomText}</Text>
                        )}
                    </Pressable>
                )}
            </View>
        </SafeAreaView>
    )
}