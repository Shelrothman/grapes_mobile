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


    return (
        <View style={styles.whole_container}>
            <View style={styles.title_container}>
                <Text style={styles.title}>
                    {new Date(grape.creation_date * 1000).toDateString()}
                </Text>
            </View>
            <View style={styles.box_container}>
                <HomeGrapeBox grape={grape} />
            </View>
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