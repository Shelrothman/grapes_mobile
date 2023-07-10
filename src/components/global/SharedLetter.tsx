/**
 * @function SharedLetter
 * @description A card-like component that displays shared cards from users
 * showing their value for the letter and their username pluys an icon depending on the letter
 */

import { StyleSheet, Text, View } from 'react-native';
import { GlobalGrape } from '../../types';
import { GrapeIcons } from '../../utils/Icons';



export function SharedLetter({ userName, letter, value }: GlobalGrape) {
    return (
        <View style={styles.card}>
            {/* HEADER */}
            <View style={styles.card_header}>
                <View style={styles.letter_container}>
                    <Text style={styles.letter}>{letter.toUpperCase()}</Text>
                </View>
                <View style={styles.title_container}>
                    <Text style={styles.title}>Function for that like in grape_id</Text>
                </View>
            </View>
            {/* BODY */}
            <View style={styles.card_body}>
                <Text style={styles.value}>{value}</Text>
            </View>
            {/* FOOTER */}
            <View style={styles.card_footer}>
                <View style={styles.icon_container}>
                    {/* <Icons letter="A" /> */}
                    <GrapeIcons letter={letter} color="#4E1E66" />
                    {/* icon for the letter with {`<`}Icons{`>`} component */}
                </View>
                <View style={styles.shared_by_container}>
                    <Text style={styles.shared_by}>Shared By: {userName}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#8ABDAA',
        borderRadius: 10,
        borderColor: '#4E1E66',
        borderWidth: 2.5,
        marginBottom: 10,
    },
    card_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card_body: {},
    card_footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    title_container: {
        // justifyContent: 'flex-start',
    },
    title: {},
    letter_container: {},
    letter: {},
    value: {},
    icon_container: {},
    shared_by_container: {},
    shared_by: {},
})