import { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import { SharedLetter } from './SharedLetter';
import Toast from 'react-native-toast-message';
import { GlobalService } from './services';
import * as globalLetters from '../../data/dummyGlobal.json';
import * as Clipboard from 'expo-clipboard';
import { RawSharedLetter, SharedLetter as SharedLetterType } from '../../types';



// TODO here fetch the shared letters from the database and display them here


export function Global() {
    const globaLService = new GlobalService();

    const [sharedLetters, setSharedLetters] = useState<RawSharedLetter[]|null>(null);
    // loading when its null..


    const copyToClipboard = async (text: string) => {
        await Clipboard.setStringAsync(text);
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Copied Text to Clipboard!',
            visibilityTime: 2000,
        });
    };


    return (
        <SafeAreaView style={styles_global.container}>
            <View style={styles_global.title_container}>
            <Text style={styles_global.title}>Global Feed (inspiration)</Text>
            </View>
            {/* <Text>Global Feed of shared letter blocks</Text> */}
            <FlatList
                data={globalLetters.global_items}
                renderItem={({ item }) => <SharedLetter {...item}
                    onCopyClick={copyToClipboard}
                />}
                showsVerticalScrollIndicator={false}
            />

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
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#a8e4a0',
    },
    title_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
});
