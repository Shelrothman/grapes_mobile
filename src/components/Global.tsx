import { StyleSheet, View, Text } from 'react-native';

export function Global() {
    return (
        <View>
            <Text>Global Feed of shared letter blocks</Text>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#889CAF',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4E1E66',
    },
});
