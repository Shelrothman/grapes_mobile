import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

// * use alwasy SafeAreaView unless u want to have content go farther for specific reason
// https://stackoverflow.com/questions/60552518/should-i-always-use-safeareaview-in-react-native

export default function Edit() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Edit</Text>
            <Link href="../">
                <Text>Go Back</Text>
            </Link>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#889CAF',
        alignItems: 'center',
        paddingTop: 50,
        justifyContent: 'center',
    },
    title: {
        // fontSize: 20,
        fontWeight: 'bold',
        color: '#4E1E66',
    },
});
