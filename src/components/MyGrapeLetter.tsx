
/**
 * a row of a grape letter
 */
import { useState, useRef } from "react";
import {
    View, Text, TextInput,
    FlatList,
    Button, StyleSheet, SafeAreaView, ScrollView, Keyboard
} from 'react-native';
import { Grape, GrapeDayLetter } from '../types';
import { Link } from 'expo-router';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DismissKeyboardView } from '../utils/DismissKeyboardView';
import { FontAwesome } from '@expo/vector-icons';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

type MyGrapeLetterProps = {
    grape_day: GrapeDayLetter;
    scrollViewRef: React.RefObject<ScrollView>;
};

type MyGrapeProps = {
    grape: Grape;
};

// TODO a photo/icon for each letter

// TODO modulate and clean up

const GRAPE_DAY = {
    "g": 'my self-care',
    "r": 'my relaxing activity',
    "a": 'big or small accomplishment',
    "p": 'my pleasant activity',
    "e": 'exercise',
    "s": 'my social activity',
}


// TODO when keyboard appears, scroll so the input is at the top... or the screen could change height...

// Or skip scrolling all together and on press of the texTInput it routes to the edit page or the edit modal... and then when you're done editing it routes back to the grape page or something.


function MyGrapeLetter({ grape_day, scrollViewRef }: MyGrapeLetterProps) {

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
        // scrollViewRef.current?.scrollTo({ y: e.nativeEvent.pageY - 100, animated: true });
    }


    // <ScrollView ref={scrollViewRef}>

    return (
        <ScrollView>

            <View style={styles.title_row}>
                <View style={styles.letterColumn}>
                    <Text style={styles.letterColText}>{grape_day.letter.toUpperCase()}</Text>
                </View>
                <View style={styles.titleColumn}>
                    {/* @ts-ignore */}
                    <Text style={styles.title}>{GRAPE_DAY[ grape_day.letter ]}</Text>
                </View>
                <View style={styles.buttonColumn}>
                    {/* <Link href="/Edit" style={{ marginRight: 10 }}>
                        <FontAwesome name="edit" size={22} color="#4E1E66" />
                    </Link> */}
                    {/* <FontAwesome.Button name="edit" size={22}
                        color="#4E1E66"
                        backgroundColor="#8ABD91"
                        onPress={() => setIsFocused(true)}
                    /> */}
                    <Link href="/share">
                        <FontAwesome name="share-square" size={22} color="#4E1E66" />
                    </Link>
                </View>
            </View>
            <View style={styles.letter_row}>
                <DismissKeyboardView style={styles.letter_input_wrap} >
                    <TextInput style={styles.letter_input}
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
                </DismissKeyboardView>
            </View>
            <Text>{'\n'}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title_row: {
        flexDirection: 'row',
        marginStart: 10,
        marginEnd: 10,
        flex: 1,
        paddingTop: 10,
    },
    title: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#4E1E66',
    },
    titleColumn: {
        flex: 7, // the higher the number the more space it takes up
        justifyContent: 'center',
        alignItems: 'center',
    },

    letterColumn: {
        borderRightWidth: 1,
        borderColor: '#4E1E66',
        justifyContent: 'center',
        // alignItems: 'flex-start',
        alignItems: 'center',
        flex: 1,
        display: 'flex',
        // backgroundColor: 'blue',
    },
    buttonColumn: {
        flexDirection: 'row',
        // justifyContent: 'flex-end',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
    },
    letterColText: {
        color: '#4E1E66',
        fontSize: 20,
        fontWeight: 'bold',
    },
    letter_row: {
        flexDirection: 'row',
    },
    letter_input_wrap: {
        display: 'flex',
        padding: 10,
        backgroundColor: '#8ABD91',
        flex: 1,
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
        // backgroundColor: 'pink',
    }
});


export function MyGrape({ grape }: MyGrapeProps) {
    const scrollViewRef = useRef<ScrollView>(null);
    return (
        <View>
            <FlatList
                data={grape.day}
                renderItem={({ item }) => <MyGrapeLetter
                    grape_day={item}
                    scrollViewRef={scrollViewRef}
                />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};
