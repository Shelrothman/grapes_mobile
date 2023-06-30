import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';



export default function Edit() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit</Text>
            <Link href="../">
                <Text>Go Back</Text>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
