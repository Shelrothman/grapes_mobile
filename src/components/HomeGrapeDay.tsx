/**
 * TODO: https://react.dev/reference/react/Component#shouldcomponentupdate
 * this is a reusable item that displays a chart-like card of each letter of the day
*/

import { View, Text, StyleSheet, Button, TouchableOpacity  } from 'react-native';
import { Grape, GrapeDay } from '../types';
import { Link } from 'expo-router';
import { HomeGrapeBox } from './HomeGrapeBox';

// import FontAwesome from 'react-native-vector-icons/FontAwesome';
type HomeGrapeItemProps = {
    grape: Grape;
};

// const currentTimeStampInMilliseconds = (new Date()).getTime();


export function HomeGrapeDay({ grape }: HomeGrapeItemProps) {

    return (
        <Link href={`/${grape.item_id}`}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {new Date(grape.creation_date * 1000).toDateString()}
                </Text>
                <HomeGrapeBox grape={grape} />
                <Text style={styles.emojiRow}>🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇🍇</Text>
            </View>
        </Link>
    )
}

// TODO if the date is not the toip one, then dont show the edit.

const styles = StyleSheet.create({
    container: {
        marginBottom: 10, // btwn each card
    },
    emojiRow: {
        marginTop: 10,
        width: '100%', // idk if this even works
    },
    title: {
        color: '#4E1E66',
        marginVertical: 5,
        fontWeight: 'bold',
        // fontFamily: 'Baskerville-Italic',
    },
});