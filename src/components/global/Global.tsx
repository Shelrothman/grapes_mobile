import React, { useState, useEffect } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, SafeAreaView, FlatList, Pressable, NativeScrollEvent, RefreshControl, ScrollView } from 'react-native';
import { SharedLetter } from './SharedLetter';
import { GlobalService } from '../../services/GlobalService';;
import { SharedLetterUI } from '../../types';
import { global_styles } from '../../styles/global';
import Loading from '../../utils/Loading';
import { copyToClipboard } from '../../utils';
// import { Ionicons } from '@expo/vector-icons';
// import { isCloseToBottom } from '../../utils';


// !! PICKUP:  infiniste scroll is set upppp.. now just need to see why the bottom div isnt showing... and maybe need a set bittim text statedjsklasljdaskl
// * or just have the last card be in itself the button


export function Global() {
    const [ globalData, setGlobalData ] = useState<SharedLetterUI[] | null>(null);
    const [ isInitialLoading, setIsInitialLoading ] = useState(true);
    const [ isMoreLoading, setIsMoreLoading ] = useState(false);
    const [ refreshing, setRefreshing ] = useState(false);
    const [ needToLoadMore, setNeedToLoadMore ] = useState<boolean>(true);
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ noMoreLeft, setNoMoreLeft ] = useState<boolean>(false);
    const [ maxLength, setMaxLength ] = useState<number>(10);
    const flatListRef = React.useRef<React.MutableRefObject<FlatList<SharedLetterUI>> | null>(null);
    const globalService = new GlobalService();

    useFocusEffect( // * this runs only when the screen is refocused
        React.useCallback(() => {
            fetchData().finally(() => setIsInitialLoading(false));
            return () => {
                cleanup();
            }
        }, [])
    );


    const onRefresh = React.useCallback(() => {
        // TODO: caching would be nice here
        setIsInitialLoading(true);
        setRefreshing(true);
        fetchData().finally(() => {
            return cleanup();
        });
    }, []);

    const cleanup = () => {
        setRefreshing(false);
        setIsInitialLoading(false);
        setNoMoreLeft(false);
        setCurrentPage(1);
    };


    async function fetchData() {
        try {
            const response = await globalService.getLastTenRows(); // get ten most recent
            setGlobalData(response);
            const maxCount = await globalService.getTotalRows();
            setMaxLength(maxCount);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
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

    const handleLoadMore = () => {
        if (maxLength >= globalData!.length) {
            setIsMoreLoading(true);
            return fetchNextSet().then(() => {
                setCurrentPage((prev) => prev + 1);
            }).finally(() => {
                setIsMoreLoading(false);
                // setNeedToLoadMore(false);
            });
        } else {
            // else there is no more data to load
            setNoMoreLeft(true);
            setNeedToLoadMore(false);
        }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1a1e47" }}>
            <View style={global_styles.title_container}>
                <Text style={global_styles.title}>Global Feed (inspiration)</Text>
            </View>
            <View style={{ paddingBottom: 20, marginBottom: 20 }}>
                {isInitialLoading ? <Loading /> : (
                    <FlatList
                        // @ts-ignore
                        ref={flatListRef}
                        data={globalData ? globalData : []}
                        renderItem={({ item }) => <SharedLetter {...item} onCopyClick={copyToClipboard} />}
                        // showsVerticalScrollIndicator={false}
                        // onScroll={({ nativeEvent }) => handleOnScroll(nativeEvent)}
                        alwaysBounceVertical={false}
                        // bounces={false} have to disable so refresh control works
                        // scrollEnabled={!isMoreLoading}
                        scrollEnabled={true}
                        keyExtractor={(item, index) => item.id.toString()}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        onEndReached={() => handleLoadMore()}
                    />
                )}
                {/* {noMoreLeft && ( */}
                <Pressable
                    style={{ display: needToLoadMore ? 'flex' : 'none', ...global_styles.load_container }}
                    onPress={() => handleLoadMore()}
                    disabled={isMoreLoading}
                >
                    {/* {isMoreLoading ? <Text>Loading...</Text> : ( */}
                    {/* // <Text><Ionicons name="md-cloud-download" size={24} color="#1a1e47" />{bottomText}</Text> */}
                    <Text>Back To Top</Text>
                    {/* )} */}
                </Pressable>
                {/* )} */}
            </View>
        </SafeAreaView>
    )
}