/**
 * 
 * this is a reusable item that displays a chart-like card of each letter of the day
*/

import { View, Text, StyleSheet, Button } from 'react-native';
import { Grape, GrapeDay } from '../types';
// import { Link } from '@react-navigation/native';
import { Link } from 'expo-router';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Edit } from '../pages';
type HomeGrapeItemProps = {
    grape: Grape;
};

// const currentTimeStampInMilliseconds = (new Date()).getTime();

// !!! PU here! I think we want to go with expo-router instead so go ahead and
// ! set that up like in SOclone and using the app/ folder and that way we have those routes in there like an express app and do that and yes.

// const Stack = createStackNavigator();

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
                <View style={styles.buttonWrapper}>
                     <Link href="/hello-letter">
                        <FontAwesome name="edit" size={20} color="#4E1E66" />
                    </Link>
                  {/*  <Link href="/share">
                        <FontAwesome name="share-square" size={20} color="#4E1E66" />
                    </Link> */}
                    {/* <Stack.Group>
                        <Stack.Screen name="Edit" component={Edit} />
                        <Stack.Screen name="Share" component={Edit} />
                    </Stack.Group> */}
                </View>
            </View>
        )
    })



    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {new Date(grape.creation_date * 1000).toDateString()}
            </Text>
            {letterRow}
            {/* <Text>{"\n"}</Text> */}
            <Text style={styles.emojiRow}>🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇</Text>
        </View>
    )
}

// TODO if the date is not the toip one, then dont show the edit.

const styles = StyleSheet.create({
    container: {
        marginBottom: 10, // btwn each card
        // borderTopColor: '#4E1E66',
        // borderTopWidth: 0.5,
    },
    buttonWrapper: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        // alignItems: 'flex-end',
        gap: 6,
    },
    emojiRow: {
        marginTop: 10,
        width: '100%', // idk if this even works
    },
    row: {
        flex: 1,
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
        flex: 1,
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