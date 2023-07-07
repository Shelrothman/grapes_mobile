/**
 * MyGrapeLetter.tsx
 * individual letter of the grape
 */
import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Grape, GrapeDayLetter } from '../../types';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePressAnimation } from "../../hooks/usePressAnimation";
import { useMyGrapeContext } from "../../contexts/MyGrapeContext";


/**
 * @interface MyMap is a type that is a map of strings to strings
 * used to allow the key string to be used as a variable to find the value string
 */
interface MyMap {
    [ key: string ]: string | undefined
}

type MyGrapeLetterProps = {
    grape_day_letter: GrapeDayLetter;
    /** setSelectedLetter selects active editable input so that it displays */
    setSelectedLetter: React.Dispatch<React.SetStateAction<GrapeDayLetter | null>>;
    selectedLetter: GrapeDayLetter | null;
};

// TODO a photo/icon for each letter
// TODO return to here and get the context working to save/persist etc the grapes data///

const GRAPE_DAY: MyMap = {
    g: 'entle with self',
    r: 'elaxation',
    a: 'ccomplishment',
    p: 'leasure',
    e: 'xercise',
    s: 'ocial Activity',
}


export function MyGrapeLetter({ grape_day_letter, setSelectedLetter, selectedLetter }: MyGrapeLetterProps) {

    // const [ inputValue, setInputValue ] = useState<string>(grape_day_letter.value);
    const inputRef = useRef<TextInput>(null);

    const { handlePressIn, handlePressOut, pressStyle } = usePressAnimation();

    const { setMyGrapeLetter } = useMyGrapeContext();

    const GRAPE_DAY_TITLE = (letter: string): JSX.Element => {
        return <Text style={{ textShadowColor: '#cb9de2', textShadowRadius: 20 }}>
            <Text style={styles.titleLetterText}>
                {letter.toUpperCase()}
            </Text>
            <Text style={styles.titleText}>{GRAPE_DAY[ letter ]}</Text>
        </Text>;
    };

    useEffect(() => {
        if (selectedLetter && selectedLetter.letter === grape_day_letter.letter) {
            if (inputRef.current) inputRef.current.focus();
        }
        return () => { if (inputRef.current) inputRef.current.blur(); }
    }, [ selectedLetter ]);

    return (
        <>
            <View style={styles.titleContainer}>
                {GRAPE_DAY_TITLE(grape_day_letter.letter)}
                <Ionicons.Button name="md-share" size={25} color="#cb9de2"
                    backgroundColor='transparent' onPress={() => console.log('share')}
                />
            </View>
            {!selectedLetter ? <Pressable style={pressStyle}
                onPress={() => setSelectedLetter(grape_day_letter)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}>
                <View style={styles.inputContainer}>
                    <Text style={styles.input}>{grape_day_letter.value}</Text>
                </View>
            </Pressable> : <View style={{ justifyContent: 'flex-end' }}>
                <TextInput
                    multiline={true}
                    numberOfLines={8}
                    key={grape_day_letter.letter}
                    style={styles.inputContainer}
                    defaultValue={grape_day_letter.value}
                    //? value={selectedLetter.value}
                    ref={inputRef}
                    // onChangeText={(text) => {
                        // acually we should do this on click of the save
                        // setMyGrapeLetter({ letter: grape_day_letter.letter, value: text });
                    // }}
                />
                <View style={styles.row}>
                    <MaterialCommunityIcons.Button name="content-save-check-outline" size={30}
                        color="#cb9de2" key="Save"
                        backgroundColor="transparent"
                        style={styles.buttons}
                        onPress={() => console.log('save')}
                        // onPress={() => setMyGrapeLetter({ letter: grape_day_letter.letter, value: inputRef.current?.value || '' })}
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
