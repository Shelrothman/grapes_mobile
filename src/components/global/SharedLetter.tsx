/**
 * @function SharedLetter
 * @description A card-like component that displays shared cards from users
 * showing their value for the letter and their username pluys an icon depending on the letter
 */
import { StyleSheet, Text, View } from 'react-native';
import { GlobalGrape } from '../../types';
import { GrapeIcons } from '../../utils/Icons';
import { GRAPE_DAY } from '../../utils/constants';
import { FontAwesome5 } from '@expo/vector-icons';

type SharedLetterProps = GlobalGrape & {
    // setCopiedText: (text: string) => void;
    onCopyClick: (text: string) => void;
};


export function SharedLetter({ userName, letter, value, onCopyClick }: SharedLetterProps) {


    return (
        <View style={styles.card}>
            {/* HEADER */}
            <View style={styles.card_header}>
                <View style={styles.iconOne_container}>
                    <GrapeIcons letter={letter} color="#cb9De2" />
                </View>
                <View style={styles.fullTitle_container}>
                    <Text style={styles.letter}>{letter.toUpperCase()}</Text>
                    <View style={styles.suffix_container}>
                        <Text style={styles.title}>
                            {GRAPE_DAY[ letter.toLowerCase() ]}
                        </Text>
                    </View>
                </View>
                <View style={styles.iconTwo_container}>
                    <GrapeIcons letter={letter} color="#cb9De2" />
                </View>
            </View>
            {/* BODY */}
            <View style={styles.card_body}>
                <Text style={styles.value}>{value}</Text>
            </View>
            {/* FOOTER */}
            <View style={styles.card_footer}>
                <View style={styles.share_container}>
                    <FontAwesome5.Button name="copy" 
                        size={25} color="#cb9De2" backgroundColor='#4E1E66'
                        onPress={() => { 
                            onCopyClick(value); 
                        }}
                        // onPress={() => { setCopiedText(value); }}
                        style={styles.button}
                    />
                </View>
                    {/* <Text>copied to clipboard</Text> */}
                <View style={styles.shared_by_container}>
                    <Text style={styles.shared_by}>Shared By: {userName}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // ! this should be used for any icon.button we use
    button: {
        // borderWidth: 1,
        // borderColor: '#4E1E66',
        paddingRight: 0,
        marginRight: 0,
    },
    card: {
        backgroundColor: '#a8e4a0',
        borderRadius: 10,
        borderColor: '#cb9De2',
        borderWidth: 2.5,
        marginBottom: 20,
        marginRight: 10,
        marginLeft: 10,
    },
    card_header: {
        backgroundColor: '#4E1E66',
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconOne_container: {
        justifyContent: 'center',
        marginLeft: 5,
    },
    iconTwo_container: {
        justifyContent: 'center',
        marginRight: 5,
    },
    card_body: {
        borderBottomColor: '#cb9De2',
        borderBottomWidth: 0.5,
        padding: 10,
        backgroundColor: '#3d4b59',
        alignItems: 'center',
    },
    card_footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    suffix_container: {
        justifyContent: 'flex-end',
        marginBottom: 5,
    },
    title: {
        color: '#cb9De2',
    },
    fullTitle_container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    letter: {
        fontSize: 30,
        color: '#cb9De2',
    },
    value: {
        fontSize: 15,
        color: '#f3f0f5',
    },
    share_container: {
        justifyContent: 'center',
        marginLeft: 5,
    },
    shared_by_container: {
        justifyContent: 'center',
        marginRight: 5,
    },
    shared_by: {
        fontStyle: 'italic',
    },
})