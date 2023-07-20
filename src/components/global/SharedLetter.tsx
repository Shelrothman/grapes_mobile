/**
 * @function SharedLetter
 * @description A card-like component that displays shared cards from users
 * showing their value for the letter and their username pluys an icon depending on the letter
 */
import { StyleSheet, Text, View } from 'react-native';
import { GlobalGrape } from '../../types';
import { GrapeIcons } from '../../utils/Icons';
import { GRAPE_DAY } from '../../utils/constants';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
// import { FontAwesome } from '@expo/vector-icons'; 
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
                        onPress={() => onCopyClick(value)}
                        style={styles.button}
                    />
                </View>
                <View style={styles.shared_by_container}>
                    <Text style={styles.shared_by}><FontAwesome name="user-circle" size={14} color="black" />: {userName}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: { paddingRight: 0, marginRight: 0, },
    card: {
        backgroundColor: '#a8e4a0',
        borderRadius: 10,
        borderColor: '#cb9De2',
        borderWidth: 2,
        marginTop: 20,
        marginBottom: 10,
        width: '85%',
        alignSelf: 'center',
    },
    card_header: {
        backgroundColor: '#4E1E66',
        borderTopEndRadius: 8,
        borderTopStartRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconOne_container: { justifyContent: 'center', marginLeft: 5, },
    iconTwo_container: { justifyContent: 'center', marginRight: 5, },
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
    suffix_container: { justifyContent: 'flex-end', marginBottom: 5, },
    title: { color: '#cb9De2', },
    fullTitle_container: { flexDirection: 'row', justifyContent: 'center', },
    letter: { fontSize: 30, color: '#cb9De2', },
    value: { fontSize: 15, color: '#f3f0f5', },
    share_container: { justifyContent: 'center', marginLeft: 5, },
    // ! maxWidth when you want text to wrap duh smarty pants!
    shared_by_container: { justifyContent: 'center', marginRight: 5, maxWidth: '50%', },
    shared_by: { fontStyle: 'italic', fontSize: 12, color: '#2E3944', },
})