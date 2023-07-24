/**
 * MyGrapeLetter.tsx
 * individual letter of the grape
 */
import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { GrapeDayLetter } from '../../types';
// import { Ionicons } from '@expo/vector-icons';
// import Toast, { ToastShowParams } from 'react-native-toast-message';
import { usePressAnimation } from "../../hooks/usePressAnimation";
import { BottomEditContainer } from "./BottomEditContainer";
import { GRAPE_DAY } from "../../utils/constants";
import { GrapeIcons } from "../../utils/Icons";
import { my_styles } from "../../styles/my";
import { ShareComponent } from "./Share";


type MyGrapeLetterProps = {
    grape_day_letter: GrapeDayLetter;
    /** setSelectedLetter selects active editable input so that it displays */
    setSelectedLetter: React.Dispatch<React.SetStateAction<GrapeDayLetter | null>>;
    selectedLetter: GrapeDayLetter | null;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};




export function MyGrapeLetter({ grape_day_letter, setSelectedLetter, selectedLetter, setLoading }: MyGrapeLetterProps) {
    const inputRef = useRef<TextInput>(null);
    // const [ loading, setLoading ] = useState<boolean>(false);
    const { handlePressIn, handlePressOut, pressStyle } = usePressAnimation();
    // const { sessionUser } = useAuthContext();

    useEffect(() => {
        if (selectedLetter && selectedLetter.letter === grape_day_letter.letter) {
            if (inputRef.current) inputRef.current.focus();
        }
        return () => { if (inputRef.current) inputRef.current.blur(); }
    }, [ selectedLetter ]);

    const GrapeTitleComponent = (letter: string): JSX.Element => {
        return <Text>
            <Text style={my_styles.titleLetterText}>
                {letter.toUpperCase()}
            </Text>
            <Text style={my_styles.titleText}>{GRAPE_DAY[ letter ]}</Text>
        </Text>;
    };

    const IconContainer = (containerOne: boolean): JSX.Element => {
        const constainerStyle = containerOne ? my_styles.iconOne_container : my_styles.iconTwo_container;
        return <View style={constainerStyle}>
            <GrapeIcons letter={grape_day_letter.letter} color="#cb9De2" size={30} />
        </View>;
    };


    return (
        <View style={my_styles.card}>
            <View style={my_styles.titleContainer}>
                {IconContainer(true)}
                {GrapeTitleComponent(grape_day_letter.letter)}
                {IconContainer(false)}
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
                <ShareComponent
                    btnSize={30}
                    grape_day_letter={grape_day_letter}
                    setLoading={setLoading}
                    editMode={true}
                />
            </View> : <BottomEditContainer
                grape_day_letter={grape_day_letter}
                setSelectedLetter={setSelectedLetter}
                selectedLetter={selectedLetter}
                inputRef={inputRef}
            />}
        </View>
    )
}