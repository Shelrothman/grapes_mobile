
/**
 * a row of a grape letter
 */
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import { Grape, GrapeDay } from '../types';
import { Link } from 'expo-router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
type MyGrapeLetterProps = {
    grape_day: GrapeDay;
};

const GRAPE_DAY = {
    "g": 'Gentle with Self',
    "r": 'Relaxation',
    "a": 'Accomplishment',
    "p": 'Pleasure',
    "e": 'Exercise',
    "s": 'Social',
}

export function MyGrapeLetter({ grape_day }: MyGrapeLetterProps) {

    const [inputValue, setInputValue] = useState<string>(grape_day.value);

    return (
        <SafeAreaView>
            {/* <Text style={styles.title}>{GRAPE_DAY[ grape_day.letter ]}</Text> */}
            <View style={styles.title_row}>
                <View>
                    {/* @ts-ignore */}
                    <Text style={styles.title}>{GRAPE_DAY[ grape_day.letter ]}</Text>
                </View>
                <View style={styles.buttonWrapper}>
                    <Link href="/Edit" style={{ marginRight: 10 }}>
                        <FontAwesome name="edit" size={22} color="#4E1E66" />
                    </Link>
                    <Link href="/share">
                        <FontAwesome name="share-square" size={22} color="#4E1E66" />
                    </Link>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.letterColumn}>
                    <Text style={styles.letterColText}>{grape_day.letter.toUpperCase()}</Text>
                </View>
                <View style={styles.letterValue}>
                    <TextInput style={styles.letterValueText}
                        multiline={true}
                        numberOfLines={4}
                        value={inputValue}
                        onChangeText={(text) => setInputValue(text)}
                        keyboardType='default'
                    />
                </View>
            </View>
            <br />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title_row: {
        flex: 1,
        flexDirection: 'row',
        marginStart: 10,
        marginEnd: 10,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#8ABD91',
        marginStart: 10,
        marginEnd: 10,
        borderColor: '#4E1E66',
        borderWidth: 0.3,
        borderRadius: 10,
    },
    title: {
        fontSize: 15,
    },
    letterColumn: {
        width: 50,
        borderRightWidth: 0.5,
        borderColor: '#4E1E66',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        display: 'flex',
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
    },
    letterColText: {
        color: '#4E1E66',
        fontSize: 20,
        fontWeight: 'bold',
    },
    letterValue: {
        display: 'flex',
        flex: 1,
        padding: 10,
    },
    letterValueText: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#003B1B',
    }
});


