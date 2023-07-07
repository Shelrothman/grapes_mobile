import { useEffect } from "react";
import { usePathname } from "expo-router";
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import { MyGrape } from '../src/components/my/MyGrape';
import { getGrapeById } from "../src/utils";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useMyGrapeContext } from "../src/contexts/MyGrapeContext";


const GrapeLetterPage = () => {
    const router = useRouter();
    const grape_letter_id = usePathname().replace('/', '');
    const grape = getGrapeById(+grape_letter_id);

    if (!grape) return <SafeAreaView style={styles.container}>
        <Text>404</Text>
        <Link href="../">Go Back</Link>
    </SafeAreaView>;

    const { setMyGrapeLetter, setCurrentGrape_id } = useMyGrapeContext();

// TODO come back here and use context to get this all set up.. focusing on u8i now


    useEffect(() => {
        // grape.day.forEach(letter => {
        //     setMyGrape(letter);
        // });
        // setMyGrape(grape.day[ 0 ]);
        setCurrentGrape_id(grape.item_id);
        // ? may not really need this bc the context is already set up to listen to the grape_id
    }, []); // this will run once on mount



    // ! may need to re-asses herein flatList bc the list is throwing virtualized list warning

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.title_container}>
                <View style={styles.back_container}>
                    <Ionicons.Button
                        name="arrow-back-circle-outline"
                        size={35}
                        backgroundColor="#4E1E66"
                        onPress={() => { router.back(); }}
                    />
                    {/* <FontAwesome name="home" size={24} color="black" /> */}
                </View>
                <View style={styles.mainTitle_container}>
                    <Text style={styles.title}>
                        Grape: {new Date(grape.creation_date * 1000).toDateString()}
                    </Text>
                </View>
            </SafeAreaView>
            <MyGrape grape={grape} />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#2E3944',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f3f0f5',
    },
    title_container: {
        flexDirection: 'row',
        backgroundColor: '#4E1E66',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainTitle_container: {
        flex: 4,
    },
    back_container: {
        flex: 1,
        flexDirection: 'row',
    },
    back_pressed: {
        width: '25%',

    },
});



export default GrapeLetterPage;