/**
 * TODO: https://react.dev/reference/react/Component#shouldcomponentupdate
 * this is a reusable item that displays a chart-like card of each letter of the day
*/
// * using context dont need routere...


import { View, Text, StyleSheet, Pressable } from 'react-native';
import { usePressAnimation } from '../../hooks/usePressAnimation';
import { Grape } from '../../types';
import { HomeGrapeBox } from './GrapeBox';
type HomeGrapeItemProps = {
    grape: Grape;
};
// import { useMyGrapeContext } from "../../contexts/MyGrapeContext";
// import GrapeLetterPage from "../my/Grape";

export function HomeGrapeDay({ grape }: HomeGrapeItemProps) {

    // const router = useRouter();

    // const { setCurrentGrape_id, currentGrape_id } = useMyGrapeContext();

    // const {
    //     isPressed,
    //     handlePressIn,
    //     handlePressOut,
    //     pressStyle
    // } = usePressAnimation();

    return (
        <View style={styles.whole_container}>
            {/* <Pressable
                // onPress={() => router.push(`/${grape.item_id}`)}
                // ** well what about rethinking this... maybe just a state is set on press and listen for that state to change. and then render the grape component
                // onPress={() => navigation.navigate('Grape', { grape_id: grape.item_id })}
                onPress={() => setCurrentGrape_id(grape.item_id)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={pressStyle}
            > */}
                <View style={styles.title_container}>
                    <Text style={styles.title}>
                        {new Date(grape.creation_date * 1000).toDateString()}
                    </Text>
                </View>
                <View style={styles.box_container}>
                    <HomeGrapeBox grape={grape} />
                </View>
            {/* </Pressable> */}
        </View>
    )
}


const styles = StyleSheet.create({
    box_container: {
        borderRadius: 10,
        borderColor: '#4E1E66',
        backgroundColor: '#8ABDAA',
        alignContent: 'center',
        borderWidth: 2.5,
        minWidth: '95%',
        maxWidth: '95%',
        // ! important that if ya wanna change these widths, have to change in HomeGrapeBox.tsx too
    },
    whole_container: {
        alignItems: 'center',
        // marginBottom: 20,
        marginTop: 30,
    },
    title_container: {
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        color: '#aa54ff',
        fontWeight: 'bold',
    },
});