import { usePathname } from "expo-router";
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import { MyGrapeLetter } from '../src/components/MyGrapeLetter';
import { getGrapeById } from "../src/utils";

const GrapeLetterPage = () => {

    const grape_letter_id = usePathname().replace('/', '');
    const grape = getGrapeById(+grape_letter_id);

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.back_container}>
                <Link href="../">{`<`}Back</Link>
            </View>
            <View style={styles.title_container}>
                <Text style={styles.title}>
                    Viewing Grape: {grape_letter_id}
                </Text>
            </View>
            {grape && grape.day.map((day, x) => (
                <MyGrapeLetter grape_day={day} />
            ))}
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#889CAF',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4E1E66',
    },
    title_container: {
        alignItems: 'center',
    },
    back_container: {
        justifyContent: 'flex-start',
    }
});



export default GrapeLetterPage;