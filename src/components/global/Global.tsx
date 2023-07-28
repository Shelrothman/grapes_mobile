import React, { useEffect, useState } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { SharedLetter } from './SharedLetter';
import Toast from 'react-native-toast-message';
import { GlobalService } from '../../services/GlobalService';
import * as Clipboard from 'expo-clipboard';
import { RawSharedLetter } from '../../types';
import { useRefreshOnFocus } from '../../hooks/useRefreshOnFocus';
import { global_styles } from '../../styles/global';


// TODO: pagination and limit the amount returning. so only return 10 or so at a time. uyntil they scroll down.


export function Global() {
    const globalService = new GlobalService();
    const [ globalData, setGlobalData ] = useState<RawSharedLetter[] | null>(null);
    const [ isLoading, setIsLoading ] = useState(true);


    // * ah now this runs only when the screen is refocused so will work right after a user posts a letter
    useFocusEffect(
        React.useCallback(() => {
            fetchData().then(() => setIsLoading(false));
            return () => { setGlobalData(null); };
        }, [])
    );

    const copyToClipboard = async (text: string) => {
        await Clipboard.setStringAsync(text);
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Copied Text to Clipboard!',
            visibilityTime: 2000,
        });
    };

    async function fetchData() {
        console.info('inside fetchData in Global')
        try {
            const response = await globalService.getAllRows();
            setGlobalData(response);
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching data:', error);
        }
    };


    return (
        <SafeAreaView style={global_styles.global_container}>
            <View style={global_styles.title_container}>
                <Text style={global_styles.title}>Global Feed (inspiration)</Text>
            </View>
            <View style={{ marginBottom: 30 }} >
                {isLoading ? <Text>Loading...</Text> : (
                    <FlatList
                        data={globalData ? globalData : []}
                        renderItem={({ item }) => <SharedLetter {...item}
                            onCopyClick={copyToClipboard}
                        />}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </SafeAreaView>
    )
}