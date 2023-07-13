import { useEffect, useState } from "react";
import { usePathname } from "expo-router";
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
// import { MyGrape } from '../components/my/MyGrape';
import { MyGrape } from "./MyGrape";
import { getGrapeById } from "../../utils";
import { useRouter } from 'expo-router';
import { useMyGrapeContext } from "../../contexts/MyGrapeContext";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GrapeIcons } from "../../utils/Icons";

type GrapeLetterPageProps = {
    grape_letter_id: number;
};

const GrapeLetterPage = ({ grape_letter_id }: GrapeLetterPageProps) => {
    // const router = useRouter();
    // const grape_letter_id = usePathname().replace('/', '');
    const grape = getGrapeById(grape_letter_id);

    if (!grape) return <SafeAreaView style={styles.container}>
        <Text>404</Text>
        <Link href="../">Go Back</Link>
    </SafeAreaView>;


    const { setCurrentGrape_id } = useMyGrapeContext();
    // const { currentLetter_edit, setCurrentGrape_id, setCurrentLetter_edit } = useMyGrapeContext();
    const [ currentLetter_edit, setCurrentLetter_edit ] = useState<string | null>(null);

    // TODO come back here and use context to get this all set up.. focusing on u8i now

    // !!! just set/unset the graLetter within jhere


    // useEffect(() => {
    //     setCurrentGrape_id(grape.item_id);
    //     // ? may not really need this bc the context is already set up to listen to the grape_id
    // }, []); // this will run once on mount

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
                        onPress={() => {
                            setCurrentLetter_edit(null);
                            setCurrentGrape_id(null);
                            // router.back(); 
                        }}
                    />
                </View>
                <View>
                    {currentLetter_edit ? (
                        <Text style={styles.title}>
                            <GrapeIcons letter={currentLetter_edit} color="#f3f0f5" size={35} />
                            {' '}{' '}
                            <GrapeIcons letter={currentLetter_edit} color="#f3f0f5" size={35} />
                            {' '}{' '}
                            <GrapeIcons letter={currentLetter_edit} color="#f3f0f5" size={35} />
                        </Text>
                    ) : (
                        <Text style={styles.title}>
                            Grape: {new Date(grape.creation_date * 1000).toDateString()}
                        </Text>
                    )}
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
        marginLeft: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f3f0f5',
        marginRight: 5,
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