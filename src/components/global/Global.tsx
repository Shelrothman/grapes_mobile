import React, { useState } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, SafeAreaView, FlatList, RefreshControl } from 'react-native';
import { SharedLetter } from './SharedLetter';
import { GlobalService } from '../../services/GlobalService';;
import { SharedLetterUI } from '../../types';
import { global_styles } from '../../styles/global';
import Loading from '../../utils/Loading';
import { copyToClipboard } from '../../utils';
import { LastCard } from './LastCard';


export function Global() {
    const [ globalData, setGlobalData ] = useState<SharedLetterUI[] | null>(null);
    const [ isInitialLoading, setIsInitialLoading ] = useState(true);
    const [ refreshing, setRefreshing ] = useState(false);
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
            console.error('Error fetching data:', error);
            return;
        }
    };

    const handleLoadMore = () => {
        if (maxLength > globalData!.length) {
            console.log('more left.. supposedly', maxLength, globalData!.length);
            return fetchNextSet().then(() => {
                setCurrentPage((prev) => prev + 1);
            }).catch((err: any) => {
                console.error('Error fetching in loadMore:', err);
            });
        } else {
            if (noMoreLeft) return; // * this is to prevent the last card from being added multiple times
            setGlobalData([ ...globalData ? globalData : [], { id: '0', letter: 'z', value: '', user_name: '', user_id: '' } ]);
            return setNoMoreLeft(true);
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
                        renderItem={({ item }) => {
                            // @ts-ignore // * <-- bc of the last cards scroll to top function
                            if (item.id === '0') return (<LastCard onClick={() => flatListRef.current?.scrollToOffset({ offset: 0 })} />);
                            return (<SharedLetter {...item} onCopyClick={copyToClipboard} />)
                        }}
                        alwaysBounceVertical={false}
                        scrollEnabled={true}
                        keyExtractor={(item, index) => item.id.toString()}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        onEndReached={() => handleLoadMore()}
                    />
                )}
            </View>
        </SafeAreaView>
    )
}