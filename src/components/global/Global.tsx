import { StyleSheet, View, Text, SafeAreaView } from 'react-native';


// TODO here fetch the shared letters from the database and display them here


export function Global() {
    return (
        <SafeAreaView style={styles_global.container}>
            <Text style={styles_global.title}>Global Feed</Text>
            <Text>Global Feed of shared letter blocks</Text>
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
        color: '#89af88',
    },
});
