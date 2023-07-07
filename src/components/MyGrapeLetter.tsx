
/**
 * a row of a grape letter
 */
import { useState, useRef } from "react";
import {
    View, Text, TextInput,
    FlatList, Platform, TouchableWithoutFeedback, TouchableHighlight,
    Button, StyleSheet, SafeAreaView, ScrollView, Keyboard, KeyboardAvoidingView
} from 'react-native';
import { Grape, GrapeDayLetter } from '../types';
// import { Link } from 'expo-router';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { DismissKeyboardView } from '../utils/DismissKeyboardView';
// import { FontAwesome } from '@expo/vector-icons';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Ionicons } from '@expo/vector-icons';

interface Map {
    [ key: string ]: string | undefined
}

type MyGrapeLetterProps = {
    grape_day: GrapeDayLetter;
    // scrollViewRef: React.RefObject<ScrollView>;
};

type MyGrapeProps = {
    grape: Grape;
};

// TODO a photo/icon for each letter

// TODO modulate and clean up

// ! PU in here... trying to get the damn thing to do the right thing for Jeyboard avoiding view
// ! just tried in here but its still shit: https://medium.com/@nickopops/keyboardavoidingview-not-working-properly-c413c0a200d4

const GRAPE_DAY: Map = {
    g: 'entle with self',
    r: 'elaxation',
    a: 'ccomplishment',
    p: 'leasure',
    e: 'xercise',
    s: 'ocial Activity',
}

const GRAPE_DAY_ICON = (letter: string): JSX.Element => {
    let phrase: JSX.Element = <Text style={{
        textShadowColor: '#cb9de2',
        textShadowRadius: 20
    }}>
        <Text style={{
            fontSize: 26,
            borderRadius: 10,
            color: '#4E1E66',
            fontStyle: 'italic',
            fontWeight: 'bold',
            textShadowColor: '#cb9de2',
            textShadowRadius: 20,
        }}>
            {letter.toUpperCase()}
        </Text>
        <Text style={styles.title}>{GRAPE_DAY[ letter ]}</Text>
    </Text>;
    return phrase;
};





function MyGrapeLetter({ grape_day }: MyGrapeLetterProps) {

    const [ inputValue, setInputValue ] = useState<string>(grape_day.value);
    const [ isFocused, setIsFocused ] = useState<boolean>(false);

    const inputRef = useRef<TextInput>(null);
    const handleBlur = () => {
        setIsFocused(false);
        inputRef.current?.blur();
        setInputValue(grape_day.value);
    }

    const handlePress = (e: any) => {
        console.log('handlePress', e.nativeEvent.pageY);
    }

    return (
        <>
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} key={grape_day.letter}>
                <ScrollView
                    // style={{ justifyContent: 'flex-end', flex: 1 }}
                    contentContainerStyle={{ justifyContent: 'flex-end', flex: 1 }}
                > */}
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        {GRAPE_DAY_ICON(grape_day.letter)}
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Ionicons.Button name="md-share" size={25} color="#cb9de2" backgroundColor='transparent'
                            onPress={() => console.log('share')}
                        />
                    </View>
                    <View style={styles.inner_view}>
                        <TextInput
                            key={grape_day.letter}
                            style={styles.letter_input}
                            ref={inputRef}
                            multiline={true}
                            numberOfLines={4}
                            value={inputValue}
                            onSubmitEditing={Keyboard.dismiss}
                            onChangeText={(text) => setInputValue(text)}
                            keyboardType='default'
                            // onFocus={handleFocus}
                            onBlur={handleBlur}
                            onPressIn={(e) => handlePress(e)}
                        />
                        <View><Text>{'\n'}</Text></View>
                    </View>
                {/* </ScrollView>
            </TouchableWithoutFeedback> */}
        </>
    )
}

const styles = StyleSheet.create({
    title_row: {
        flexDirection: 'row',
        marginStart: 10,
        marginEnd: 10,
        borderRadius: 10,
    },
    title: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#cb9de2',
    },
    letterColText: {
        color: '#cb9de2',
        fontSize: 20,
        fontWeight: 'bold',
    },
    inner_view: {
        flex: 1,
        padding: 10,
        backgroundColor: '#8ABD91',
        marginStart: 10,
        marginEnd: 10,
        borderColor: '#4E1E66',
        borderWidth: 1,
        borderRadius: 10,
        height: 100,
    },

    active_input: {
        padding: 10,
        display: 'flex',
        height: 100,
    },
    letter_input: {
        // fontStyle: 'italic',
        // fontWeight: 'bold',
        color: '#003B1B',
    },
    input: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36,
    },
});


export function MyGrape({ grape }: MyGrapeProps) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        // style={{ justifyContent: 'flex-end', flex: 1 }}
                        contentContainerStyle={{ justifyContent: 'flex-end', flex: 1 }}
                    >
                        <MyGrapeLetter grape_day={grape.day[ 0 ]} />
                        <MyGrapeLetter grape_day={grape.day[ 1 ]} />
                        <MyGrapeLetter grape_day={grape.day[ 2 ]} />
                        <MyGrapeLetter grape_day={grape.day[ 3 ]} />
                        <MyGrapeLetter grape_day={grape.day[ 4 ]} />
                        <MyGrapeLetter grape_day={grape.day[ 5 ]} />
                    </ScrollView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>

    );
};
