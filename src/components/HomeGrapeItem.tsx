import { View, Text, StyleSheet } from 'react-native';
import { Grape, GrapeDay } from '../types';
/**
 * 
 * this is a reusable item that displays a chart-like card of each letter of the day
 */


type HomeGrapeItemProps = {
    grape: Grape;
};

const GRAPE_DAY = {
    "g": 'Gentle with Self',
    "r": 'Relaxation',
    "a": 'Accomplishment',
    "p": 'Pleasure',
    "e": 'Exercise',
    "s": 'Social',
}

export function HomeGrapeItem({ grape }: HomeGrapeItemProps) {

    const letterRow = grape.day.map((day: GrapeDay, x: number) => {
        return (
            <View style={x % 2 == 0 ? styles.row : styles.alt_row} key={day.letter}>
                <View style={styles.letterColumn}>
                    <Text style={styles.letterColText}>{day.letter.toUpperCase()}</Text>
                </View>
                <View style={styles.letterValue}>
                    <Text style={styles.letterValueText}>
                        {day.value}
                    </Text>
                </View>
                {/* // TODO: use this info for the dewfaut/placeholder for the editing instead */}
                {/* <br />
                    <View style={styles.small_container}>
                         @ts-ignore
                        <Text style={styles.small_text}>{GRAPE_DAY[ day.letter ]}</Text>
                    </View> */}
            </View>
        )
    })



    return (
        <View style={styles.container}>
            {/* <Text style={styles.stats}>
                {question.score} votes · {question.answer_count} answers ·{' '}
                {question.view_count} views
            </Text> */}
            <Text style={styles.title}>
                {new Date(grape.creation_date * 1000).toDateString()}
            </Text>
            {letterRow}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 20, // btwn each card
        // borderTopColor: '#4E1E66',
        // borderTopWidth: 0.5,
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#8ABD91',
        borderBottomColor: '#4E1E66',
        borderBottomWidth: 0.5,
    },
    alt_row: {
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

        padding: 10,
    },
    letterValue_alt: {
        color: '#f3f0f5',
    },
    letterValueText: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#003B1B',
    },
    title: {
        color: '#4E1E66',
        marginVertical: 5,
        fontWeight: 'bold',
        // fontFamily: 'Baskerville-Italic',
    },
    small_container: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        // flexWrap: 'wrap',
        alignContent: 'flex-end',

    },
    small_text: {
        fontSize: 10,
        padding: 2,
        // flexWrap: 'wrap',
    }
});