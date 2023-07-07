import { useEffect } from "react";
import { usePathname } from "expo-router";
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import { MyGrape } from '../src/components/my/MyGrape';
import { getGrapeById } from "../src/utils";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useMyGrapeContext } from "../src/contexts/MyGrapeContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';


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
            <SafeAreaView style={styles.header_container}>
                <View style={styles.back_container}>
                    <MaterialCommunityIcons.Button
                        name="home-export-outline"
                        size={35}
                        style={styles.buttons}
                        backgroundColor="#4E1E66"
                        onPress={() => { router.back(); }}
                    />
                </View>
                <View>
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
    buttons: {
        borderWidth: 1,
        borderColor: '#cb9de2',
        paddingLeft: 20,
        borderRadius: 5,
        transform: [ { rotateY: '180deg' } ],
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f3f0f5',
    },
    header_container: {
        flexDirection: 'row',
        backgroundColor: '#4E1E66',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    back_container: {
        marginBottom: 5,
        borderColor: '#f3f0f5',
    }
});



export default GrapeLetterPage;