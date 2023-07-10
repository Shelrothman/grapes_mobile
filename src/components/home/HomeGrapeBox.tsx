import { View, Text, StyleSheet } from 'react-native';
import { Grape, GrapeDayLetter } from '../../types';

type HomeGrapeLetterRowProps = {
    grape: Grape;
};


export function HomeGrapeBox({ grape }: HomeGrapeLetterRowProps) {
    return (
        <>
            {grape.day.map((day: GrapeDayLetter, x: number) => (
                <View style={x % 2 == 0 ? styles.row : styles.alt_row} key={day.letter}>
                    <View style={styles.letterColumn}>
                        <Text style={styles.letterColText}>{day.letter.toUpperCase()}</Text>
                    </View>
                    <View style={styles.letterValue}>
                        <Text style={styles.letterValueText}>
                            {day.value}
                        </Text>
                    </View>
                </View>
            ))}
        </>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderColor: '#4E1E66',
        borderBottomWidth: 0.5,
    },
    alt_row: {
        flexDirection: 'row',
        borderColor: '#4E1E66',
        borderBottomWidth: 0.5,
    },
    letterColumn: {
        width: 50,
        borderRightWidth: 0.5,
        borderColor: '#4E1E66',
        justifyContent: 'center',
        padding: 10,
        alignItems: 'center',
    },
    letterColText: {
        color: '#4E1E66',
        fontSize: 20,
        fontWeight: 'bold',
    },
    letterValue: {
        padding: 10,
        width: '85%',
        // ! important that if ya wanna change this width, ya gotta change the width of the letterValue_alt too AND the parent components
        wordWrap: 'break-word',
    },
    letterValue_alt: {
        wordWrap: 'break-word',
        width: '85%',
        padding: 10,
    },
    letterValueText: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#4E1E66',
    }
});