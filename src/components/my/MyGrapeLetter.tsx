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
import { GRAPE_DAY } from "../../utils/constants";
import { GrapeIcons } from "../../utils/Icons";
import { my_styles } from "../../styles/my";

type MyGrapeLetterProps = {
    grape_day_letter: GrapeDayLetter;
    /** setSelectedLetter selects active editable input so that it displays */
    setSelectedLetter: React.Dispatch<React.SetStateAction<GrapeDayLetter | null>>;
    selectedLetter: GrapeDayLetter | null;
};

// TODO return to here and get the context working to save/persist etc the grapes data///



export function MyGrapeLetter({ grape_day_letter, setSelectedLetter, selectedLetter }: MyGrapeLetterProps) {
    const inputRef = useRef<TextInput>(null);
    const { handlePressIn, handlePressOut, pressStyle } = usePressAnimation();

    const GRAPE_DAY_TITLE = (letter: string): JSX.Element => {
        return <Text>
            <Text style={my_styles.titleLetterText}>
                {letter.toUpperCase()}
            </Text>
            <Text style={my_styles.titleText}>{GRAPE_DAY[ letter ]}</Text>
        </Text>;
    };

    useEffect(() => {
        if (selectedLetter && selectedLetter.letter === grape_day_letter.letter) {
            if (inputRef.current) inputRef.current.focus();
        }
        return () => { if (inputRef.current) inputRef.current.blur(); }
    }, [ selectedLetter ]);

 // TODO now we need to modulate this brap 

    return (
        <View style={my_styles.card}>
            <View style={my_styles.titleContainer}>
                <View style={my_styles.iconOne_container}>
                    <GrapeIcons letter={grape_day_letter.letter} color="#cb9De2" size={30} />
                </View>
                {GRAPE_DAY_TITLE(grape_day_letter.letter)}
                <View style={my_styles.iconTwo_container}>
                    <GrapeIcons letter={grape_day_letter.letter} color="#cb9De2" size={30} />
                </View>
            </View>
            {!selectedLetter ? <View style={my_styles.bottomRowContainer}>
                <Pressable style={{ ...pressStyle, ...my_styles.pressable }}
                    onPress={() => setSelectedLetter(grape_day_letter)}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}>
                    <View style={{ maxWidth: '90%', minWidth: '90%' }}>
                        <Text style={my_styles.input_text}>{grape_day_letter.value}</Text>
                    </View>
                </Pressable>

                <View style={my_styles.share_container}>
                    <Ionicons.Button name="md-share" size={30} color="#a8e4a0"
                        backgroundColor='transparent' onPress={() => console.log('share')}
                        style={{ padding: 0 }}
                    />
                </View>
            </View> : (<>
                <View style={my_styles.bottomInEditContainer}>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        key={grape_day_letter.letter}
                        style={my_styles.input_text}
                        defaultValue={grape_day_letter.value}
                        //? value={selectedLetter.value}
                        ref={inputRef}
                    // onChangeText={(text) => {
                    // acually we should do this on click of the save
                    // setMyGrapeLetter({ letter: grape_day_letter.letter, value: text });
                    // }}
                    />
                    <View style={my_styles.row}>
                        <MaterialIcons.Button name="cancel" size={30} key="Cancel"
                            color="#cb9de2" backgroundColor="transparent"
                            style={my_styles.buttons}
                            onPress={() => {
                                setSelectedLetter(null)
                                // setCurrentLetter_edit(null);
                            }}
                        />
                        {/* //TODO add a confirmation button on cancle click */}
                        <MaterialCommunityIcons.Button name="content-save-check-outline" size={30}
                            color="#cb9de2" key="Save"
                            backgroundColor="transparent"
                            style={my_styles.buttons}
                            onPress={() => console.log('save')}
                        // onPress={() => setMyGrapeLetter({ letter: grape_day_letter.letter, value: inputRef.current?.value || '' })}
                        />
                    </View>
                </View>
            </>)}
        </View>
    )
}