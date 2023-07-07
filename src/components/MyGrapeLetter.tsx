
/**
 * a row of a grape letter
 */
import { useState, useRef } from "react";
import {
    View, Text, TextInput, Pressable, FlatList,
    Button, StyleSheet, SafeAreaView, ScrollView, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback
} from 'react-native';
import { Grape, GrapeDayLetter } from '../types';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Map {
    [ key: string ]: string | undefined
}

type MyGrapeLetterProps = {
    grape_day: GrapeDayLetter;
    // scrollViewRef: React.RefObject<ScrollView>;
    /** selects active editable input so that it only displays that. */
    setSelectedLetter: React.Dispatch<React.SetStateAction<GrapeDayLetter | null>>;
    selectedLetter: GrapeDayLetter | null;
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

// ? should this function be inside of MyGrapeLetter
const GRAPE_DAY_TITLE = (letter: string): JSX.Element => {
    let phrase: JSX.Element = <Text style={{
        textShadowColor: '#cb9de2',
        textShadowRadius: 20
    }}>
        <Text style={styles.titleLetterText}>
            {letter.toUpperCase()}
        </Text>
        <Text style={styles.titleText}>{GRAPE_DAY[ letter ]}</Text>
    </Text>;
    return phrase;
};





function MyGrapeLetter({ grape_day, setSelectedLetter, selectedLetter }: MyGrapeLetterProps) {

    const [ inputValue, setInputValue ] = useState<string>(grape_day.value);
    // const [ isFocused, setIsFocused ] = useState<boolean>(false);
    const [ isPressed, setIsPressed ] = useState<boolean>(false);

    // const inputRef = useRef<TextInput>(null);
    const handlePressIn = () => setIsPressed(true);
    const handlePressOut = () => setIsPressed(false);

    return (
        <>
            <View style={styles.titleContainer}>
                {GRAPE_DAY_TITLE(grape_day.letter)}
                <Ionicons.Button name="md-share" size={25} color="#cb9de2"
                    backgroundColor='transparent'
                    onPress={() => console.log('share')}
                />
            </View>
            {!selectedLetter ? <Pressable
                onPress={() => setSelectedLetter(grape_day)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={isPressed ? styles.pressed : {}}
            >
                <View style={styles.inputContainer}>
                    <Text style={styles.input}>
                        {inputValue}
                    </Text>
                </View>
            </Pressable> : <View style={{ justifyContent: 'flex-end' }}>
                <TextInput
                    key={grape_day.letter}
                    style={styles.inputContainer}
                    // ref={inputRef}
                    multiline={true}
                    numberOfLines={8}
                    value={inputValue}
                    keyboardType='default'
                />
                <View style={styles.row}>
                    {/* <AntDesign.Button name="checkcircle" size={30} color="black" key="Save" /> */}
                    <MaterialCommunityIcons.Button name="content-save-check-outline" size={30}
                        color="#cb9de2" key="Save"
                        backgroundColor="transparent"
                        style={styles.buttons}
                    />
                    <MaterialIcons.Button name="cancel" size={30} key="Cancel"
                        color="#cb9de2" backgroundColor="transparent"
                        style={styles.buttons}
                        onPress={() => setSelectedLetter(null)}
                    />
                </View>
            </View>}
        </>
    )
}

const styles = StyleSheet.create({
    pressed: {
        backgroundColor: '#4E1E66',
        borderRadius: 10,
        padding: 7,
    },
    buttons: {
        borderWidth: 1, borderColor: '#cb9de2', paddingLeft: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleLetterText: {
        fontSize: 26,
        borderRadius: 10,
        color: '#4E1E66',
        fontStyle: 'italic',
        fontWeight: 'bold',
        textShadowColor: '#cb9de2',
        textShadowRadius: 20,
    },
    titleText: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#cb9de2',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        color: '#f3f0f5',
    },
    inputContainer: {
        height: 40,
        marginTop: 10,
        borderColor: '#cb9de2',
        borderBottomWidth: 1,
        marginBottom: 36,
        color: '#f3f0f5'
    }
});


export function MyGrape({ grape }: MyGrapeProps) {

    const [ selectedLetter, setSelectedLetter ] = useState<GrapeDayLetter | null>(null);


    return (
        <View style={{ flex: 1, margin: 10 }}>
            {!selectedLetter && <FlatList
                data={grape.day}
                renderItem={({ item }) => <MyGrapeLetter grape_day={item}
                    setSelectedLetter={setSelectedLetter} selectedLetter={selectedLetter} />}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            />}
            {selectedLetter && (<KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <MyGrapeLetter grape_day={selectedLetter} selectedLetter={selectedLetter} setSelectedLetter={setSelectedLetter} />
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAvoidingView>)}
        </View>
    );
};
