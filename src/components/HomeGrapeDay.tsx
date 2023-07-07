/**
 * TODO: https://react.dev/reference/react/Component#shouldcomponentupdate
 * this is a reusable item that displays a chart-like card of each letter of the day
*/

import { useState } from 'react';
import { View, Text, StyleSheet, Button, SafeAreaView, Pressable } from 'react-native';
import { Grape, GrapeDayLetter } from '../types';
import { useNavigation, useRouter } from 'expo-router';
import { HomeGrapeBox } from './HomeGrapeBox';

// import FontAwesome from 'react-native-vector-icons/FontAwesome';
type HomeGrapeItemProps = {
    grape: Grape;
};


// const currentTimeStampInMilliseconds = (new Date()).getTime();


export function HomeGrapeDay({ grape }: HomeGrapeItemProps) {

    const [ isPressed, setIsPressed ] = useState<boolean>(false);
    const router = useRouter();

    const handlePressIn = () => setIsPressed(true);
    const handlePressOut = () => setIsPressed(false);

    return (
        <View style={styles.whole_container}>
            <Pressable
                onPress={() => router.push(`/${grape.item_id}`)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={isPressed ? styles.pressed : {}}
            >
                <View style={styles.title_container}>
                    <Text style={styles.title}>
                        {new Date(grape.creation_date * 1000).toDateString()}
                    </Text>
                </View>
                <View style={styles.box_container}>
                    <HomeGrapeBox grape={grape} />
                </View>
            </Pressable>

        </View>
    )
}


const styles = StyleSheet.create({
    pressed: {
        backgroundColor: '#4E1E66',
        borderRadius: 10,
        padding: 7,
    },
    box_container: {
        borderRadius: 10,
        borderColor: '#4E1E66',
        backgroundColor: '#8ABDAA',
        alignContent: 'center',
        borderWidth: 2.5,
        minWidth: '85%',
        maxWidth: '85%',
        // ! important that if ya wanna change these widths, have to change in HomeGrapeBox.tsx too
    },
    whole_container: {
        alignItems: 'center',
        marginBottom: 20,
    },
    title_container: {
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        color: '#aa54ff',
        fontWeight: 'bold',
    },
});