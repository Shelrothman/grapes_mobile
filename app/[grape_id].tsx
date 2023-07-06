import { usePathname } from "expo-router";
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Link } from 'expo-router';
import { MyGrape } from '../src/components/MyGrapeLetter';
import { getGrapeById } from "../src/utils";
// import 'react-native-get-random-values';
// import { v4 as uuidv4 } from 'uuid';
// import { Icon } from 'react-native-elements'
// import MaterialComm

const GrapeLetterPage = () => {

    const grape_letter_id = usePathname().replace('/', '');
    const grape = getGrapeById(+grape_letter_id);

    if (!grape) return <SafeAreaView style={styles.container}>
        <Text>404</Text>
        <Link href="../">Go Back</Link>
    </SafeAreaView>;


    // ! may need to re-asses herein flatList bc the list is throwing virtualized list warning

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.back_container}>
                <Link href="../">{`<`}Back</Link>
            </View>
            <View style={styles.title_container}>
                <Text style={styles.title}>Grape: {new Date(grape.creation_date * 1000).toDateString()}</Text>
            </View>
            <KeyboardAvoidingView style={styles.grape_container}>
                {/* <Text>{'\n'}</Text> */}

                <MyGrape grape={grape} />
            </KeyboardAvoidingView>
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
        // marginBottom: 10,
        borderBottomColor: '#4E1E66',
        borderBottomWidth: 1,
        padding: 5,
        paddingBottom: 20,
    },
    back_container: {
        justifyContent: 'flex-start',
    },
    grape_container: {
        // paddingTop: 10,
        // marginTop: 10,
    },
});



export default GrapeLetterPage;