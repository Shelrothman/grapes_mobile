import { useEffect, useState } from 'react';
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
    // Use the useRefreshOnFocus hook to refetch data when the component gains focus.
    useRefreshOnFocus(fetchData);
    // Initial fetch when the component mounts
    useEffect(() => { fetchData(); }, []);

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
        try {
            const response = await globalService.getAllRows();
            // console.log('response from global fetch:', response);
            setGlobalData(response);
            setIsLoading(false);
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