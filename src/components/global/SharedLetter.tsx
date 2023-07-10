/**
 * @function SharedLetter
 * @description A card-like component that displays shared cards from users
 * showing their value for the letter and their username pluys an icon depending on the letter
 */

import { StyleSheet, Text, View } from 'react-native';
import { GlobalGrape } from '../../types';
import { GrapeIcons } from '../../utils/Icons';
import { GRAPE_DAY } from '../../utils/constants';


export function SharedLetter({ userName, letter, value }: GlobalGrape) {


    return (
        <View style={styles.card}>
            {/* HEADER */}
            <View style={styles.card_header}>
                <View style={styles.letter_container}>
                    <Text style={styles.letter}>{letter.toUpperCase()}</Text>
                </View>
                <View style={styles.title_container}>
                    <Text style={styles.title}>
                        {GRAPE_DAY[ letter.toLowerCase() ]}
                    </Text>
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
        backgroundColor: '#a8e4a0',
        // opacity: 0.8,
        borderRadius: 10,
        borderColor: '#cb9De2',
        borderWidth: 2.5,
        marginBottom: 20,
        marginRight: 10,
        marginLeft: 10,
    },
    card_header: {
        backgroundColor: '#4E1E66',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    card_body: {
        borderBottomColor: '#cb9De2',
        borderBottomWidth: 0.5,
        padding: 10,
    },
    card_footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    title_container: {
        // backgroundColor: '#cb9De2',
        justifyContent: 'flex-end',
        // alignItems: 'center',
        marginBottom: 5,
    },
    title: {
        color: '#cb9De2',
    },
    letter_container: {
        // backgroundColor: '#4E1E66',
        paddingBottom: 0,
        marginBottom: 0,

    },
    letter: {
        fontSize: 30,
        color: '#cb9De2',
    },
    value: {
        // fontSize: 10,
        // fontWeight: 'bold',
    },
    icon_container: {},
    shared_by_container: {},
    shared_by: {
        fontStyle: 'italic',
    },
})