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
// import { useMyGrapeContext } from "../../contexts/MyGrapeContext";
import { GRAPE_DAY } from "../../utils/constants";
import { GrapeIcons } from "../../utils/Icons";


type MyGrapeLetterProps = {
    grape_day_letter: GrapeDayLetter;
    /** setSelectedLetter selects active editable input so that it displays */
    setSelectedLetter: React.Dispatch<React.SetStateAction<GrapeDayLetter | null>>;
    selectedLetter: GrapeDayLetter | null;
};

// TODO a photo/icon for each letter
// TODO return to here and get the context working to save/persist etc the grapes data///



export function MyGrapeLetter({ grape_day_letter, setSelectedLetter, selectedLetter }: MyGrapeLetterProps) {

    // const [ inputValue, setInputValue ] = useState<string>(grape_day_letter.value);
    const inputRef = useRef<TextInput>(null);

    const { handlePressIn, handlePressOut, pressStyle } = usePressAnimation();

    // const { setCurrentLetter_edit } = useMyGrapeContext();

    const GRAPE_DAY_TITLE = (letter: string): JSX.Element => {
        return <Text>
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

    // useEffect(() => {
    //     if (selectedLetter && selectedLetter.letter === grape_day_letter.letter) {

    return (
        <View style={styles.card}>
            <View style={!selectedLetter ? styles.titleContainer : {
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <View style={styles.iconOne_container}>
                    <GrapeIcons letter={grape_day_letter.letter} color="#cb9De2" size={30} />
                </View>
                {GRAPE_DAY_TITLE(grape_day_letter.letter)}
                <View style={styles.iconTwo_container}>
                    <GrapeIcons letter={grape_day_letter.letter} color="#cb9De2" size={30} />
                </View>
            </View>
            {!selectedLetter ? <View style={styles.bottomRowContainer}>
                <Pressable style={{ ...pressStyle, ...styles.pressable }}
                    onPress={() => setSelectedLetter(grape_day_letter)}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}>
                    <View style={{ maxWidth: '90%', minWidth: '90%' }}>
                        <Text style={styles.input_text}>{grape_day_letter.value}</Text>
                    </View>
                </Pressable>

                <View style={styles.share_container}>
                    <Ionicons.Button name="md-share" size={30} color="#a8e4a0"
                        backgroundColor='transparent' onPress={() => console.log('share')}
                        style={{ padding: 0 }}
                    />
                </View>
            </View> : (
                <View style={styles.bottomInEditContainer}>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        key={grape_day_letter.letter}
                        style={styles.input_text}
                        // style={styles.inputContainer}
                        defaultValue={grape_day_letter.value}
                        //? value={selectedLetter.value}
                        ref={inputRef}
                    // onChangeText={(text) => {
                    // acually we should do this on click of the save
                    // setMyGrapeLetter({ letter: grape_day_letter.letter, value: text });
                    // }}
                    />
                    <View style={styles.row}>
                    <MaterialIcons.Button name="cancel" size={30} key="Cancel"
                            color="#cb9de2" backgroundColor="transparent"
                            style={styles.buttons}
                            onPress={() => {
                                setSelectedLetter(null)
                                // setCurrentLetter_edit(null);
                            }}
                        />
                        {/* //TODO add a confirmation button on cancle click */}
                        <MaterialCommunityIcons.Button name="content-save-check-outline" size={30}
                            color="#cb9de2" key="Save"
                            backgroundColor="transparent"
                            style={styles.buttons}
                            onPress={() => console.log('save')}
                        // onPress={() => setMyGrapeLetter({ letter: grape_day_letter.letter, value: inputRef.current?.value || '' })}
                        />

                    </View>
                </View>)}
        </View>
    )
}

const styles = StyleSheet.create({
    share_container: {
        flexDirection: 'row',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        paddingBottom: 10,
    },
    card: {
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 20,
        borderColor: '#cb9de2',
        backgroundColor: '#3d4b59',
        flexDirection: 'column',
    },
    iconOne_container: { justifyContent: 'center', marginLeft: 5, },
    iconTwo_container: { justifyContent: 'center', marginRight: 5, },
    pressable: {
        borderTopEndRadius: 0,
        borderTopStartRadius: 0,
        height: "100%",
        justifyContent: 'center',
        // marginTop: 5,
    },
    pressed: { backgroundColor: '#4E1E66', padding: 7, },
    buttons: { paddingLeft: 15 },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleLetterText: {
        fontSize: 26,
        color: '#cb9de2',
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    titleText: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#cb9de2',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#4E1E66',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        flex: 1,
        // marginBottom: 5,
    },
    input_text: { marginLeft: 10, color: '#f3f0f5', },
    bottomRowContainer: {
        flexDirection: 'row',
        flex: 1,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        color: '#f3f0f5',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingTop: 5,
    },
    bottomInEditContainer: {
        flexDirection: 'column',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        color: '#f3f0f5',
    },
});
