import { View, Text, StyleSheet } from 'react-native';
import { Grape, GrapeDay } from '../types';

type HomeGrapeLetterRowProps = {
    grape: Grape;
};


export function HomeGrapeBox({ grape }: HomeGrapeLetterRowProps) {
    return (
        <>
            {grape.day.map((day: GrapeDay, x: number) => (
                // <View style={x % 2 == 0 ? styles.row : styles.alt_row} key={day.letter}>
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
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: '#8ABD91',
        borderBottomColor: '#4E1E66',
        borderBottomWidth: 0.5,
    },
    alt_row: {
        // flex: 1,
        flexDirection: 'row',
        backgroundColor: '#8ABDAA',
        borderBottomColor: '#4E1E66',
        borderBottomWidth: 0.5,
    },
    letterColumn: {
        width: 50,
        borderRightWidth: 0.5,
        borderColor: '#4E1E66',
        alignItems: 'center',
        justifyContent: 'center',
        // alignItems: 'flex-start',
        padding: 3,
        display: 'flex',
    },
    letterColText: {
        color: '#4E1E66',
        fontSize: 20,
        fontWeight: 'bold',
    },
    letterValue: {
        display: 'flex',
        // flex: 1,
        padding: 10,
    },
    letterValue_alt: {
        color: '#f3f0f5',
    },
    letterValueText: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#003B1B',
    }
});