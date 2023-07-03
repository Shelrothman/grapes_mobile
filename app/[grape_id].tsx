import { usePathname } from "expo-router";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { MyGrapeLetter } from '../src/components/MyGrapeLetter';
import { getGrapeById } from "../src/utils";
// import { v4 as uuidv4 } from 'uuid';


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
            {/* {grape && grape.day.map((day, x) => (
                <MyGrapeLetter grape_day={day} key={uuidv4()} />
            ))} */}
            { grape && <FlatList
                data={grape.day}
                renderItem={({ item }) => <MyGrapeLetter grape_day={item} />}
                // showsVerticalScrollIndicator={false}
            />}
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        height: '100%',
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