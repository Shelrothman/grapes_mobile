import { StyleSheet, View, Text, SafeAreaView, FlatList } from 'react-native';
import { SharedLetter } from './SharedLetter';
import * as globalLetters from '../../data/dummyGlobal.json';
// TODO here fetch the shared letters from the database and display them here


export function Global() {
    return (
        <SafeAreaView style={styles_global.container}>
            <Text style={styles_global.title}>Global Feed</Text>
            {/* <Text>Global Feed of shared letter blocks</Text> */}
            <FlatList
                data={globalLetters.global_items}
                renderItem={({ item }) => <SharedLetter {...item} />}
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
});
