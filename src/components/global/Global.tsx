import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import { SharedLetter } from './SharedLetter';
import Toast from 'react-native-toast-message';
// import { GlobalService } from './services';
import { GlobalService } from '../../services/GlobalService';
import * as Clipboard from 'expo-clipboard';
import { RawSharedLetter } from '../../types';
import { useRefreshOnFocus } from '../../hooks/useRefreshOnFocus';

// TODO display the date for each one?

export function Global() {
    const globalService = new GlobalService();

    const [ globalData, setGlobalData ] = useState<RawSharedLetter[] | null>(null);

    const [ isLoading, setIsLoading ] = useState(true);
    // Use the useRefreshOnFocus hook to refetch data when the component gains focus.
    useRefreshOnFocus(fetchData);

    useEffect(() => {
        // Initial fetch when the component mounts
        fetchData();
    }, []); //? shouldnt need this bc the useFocusEffect should handle this

    const copyToClipboard = async (text: string) => {
        await Clipboard.setStringAsync(text);
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Copied Text to Clipboard!',
            visibilityTime: 2000,
        });
    };
    // TODO: pagination and limit the amount returning.

    // TODO handle getting it into the form.

    // data fetching logic
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
        <SafeAreaView style={styles_global.container}>
            <View style={styles_global.title_container}>
                <Text style={styles_global.title}>Global Feed (inspiration)</Text>
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



const styles_global = StyleSheet.create({
    container: {
        backgroundColor: '#2E3944',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    title: { fontSize: 18, fontWeight: 'bold', color: '#a8e4a0', },
    title_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
});
