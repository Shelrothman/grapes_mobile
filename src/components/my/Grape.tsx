import { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { MyGrape } from "./MyGrape";
import { getGrapeById } from "../../utils";
import { GrapeIcons } from "../../utils/Icons";
import { GrapeDayLetter } from "../../types";
import { useMyGrapeContext } from "../../contexts/MyGrapeContext";
// TODO maybe put this whole file into Home.tsx

// type GrapeLetterPageProps = {
//     grape_letter_id: number;
// };
// const {  currentLetter_edit: selectedLetter, 
//     setCurrentLetter_edit: setSelectedLetter
// } = useMyGrapeContext();
const GrapeLetterPage = () => {
    // const router = useRouter();
    // const grape_letter_id = usePathname().replace('/', '');


    // TODO come back and implement this being TODAYS grape.. hard coding for nowq
    const grape = getGrapeById(0);


    if (!grape) return <SafeAreaView style={styles.container}>
        <Text>404 Not Found</Text>
        {/* <Link href="../">Go Back</Link> */}
    </SafeAreaView>;


    const [ selectedLetter, setSelectedLetter ] = useState<GrapeDayLetter | null>(null);


    const iconProps = { letter: selectedLetter?.letter || '', color: "#a8e4a0", size: 35 };


    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header_container}>
                <View>
                    {selectedLetter ? (
                        <Text style={styles.icon_title}>
                            <GrapeIcons {...iconProps} />
                            {' '}{' '}
                            <GrapeIcons {...iconProps} />
                            {' '}{' '}
                            <GrapeIcons {...iconProps} />
                        </Text>
                    ) : (
                        <Text style={styles.title}>
                            Today: {new Date().toDateString()}
                        </Text>
                    )}
                </View>
            </SafeAreaView>
            <MyGrape grape={grape} selectedLetter={selectedLetter} setSelectedLetter={setSelectedLetter} />
        </View>
    );
}


// * blerg i am not sure what makes these cards look wider than the sharedLetter cards
// TODO figure that out and make them the same width
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#2E3944',
        width: '85%',
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
        color: '#a8e4a0',
    },
    icon_title: {
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#a8e4a0',
    },
    header_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
});



export default GrapeLetterPage;