/**
 * MyGrapeLetter.tsx
 * individual letter of the grape
 */
import { useRef, useEffect } from "react";
import { View, Text, TextInput, Pressable } from 'react-native';
import { Grape, GrapeDayLetter } from '../../types';
import { usePressAnimation } from "../../hooks/usePressAnimation";
import { BottomEditContainer } from "./BottomEditContainer";
import { GRAPE_DAY } from "../../utils/constants";
import { GrapeIcons } from "../../utils/Icons";
import { my_styles } from "../../styles/my";
import { ShareComponent } from "./Share";
import { useHomeGrapeContext } from "../../contexts/HomeGrapeContext";

type MyGrapeLetterProps = {
    /** setGrape updates the grape in Home */
    setGrape: React.Dispatch<React.SetStateAction<Grape | null>>;
    grape_day_letter: GrapeDayLetter;
    /** setSelectedLetter selects active editable input so that it displays */
    setSelectedLetter: React.Dispatch<React.SetStateAction<GrapeDayLetter | null>>;
    selectedLetter: GrapeDayLetter | null;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};


export function MyGrapeLetter({ grape_day_letter, setSelectedLetter, selectedLetter, setLoading, setGrape }: MyGrapeLetterProps) {
    const inputRef = useRef<TextInput>(null);
    const { handlePressIn, handlePressOut, pressStyle } = usePressAnimation();
    const { setTabBarEnabled } = useHomeGrapeContext();

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

    // i do wonder if i build this out again.. like a scroll form thing like i did with account.. if ther scroll would work and jsut ve better and not have to be all hacky like this os

    return (
        <View style={my_styles.card}>
            <View style={my_styles.titleContainer}>
                {IconContainer(true)}
                {GrapeTitleComponent(grape_day_letter.letter)}
                {IconContainer(false)}
            </View>
            {!selectedLetter ? <View style={my_styles.bottomRowContainer}>
                <Pressable style={{ ...pressStyle, ...my_styles.pressable }}
                    onPress={() => {
                        setSelectedLetter(grape_day_letter);
                        setTabBarEnabled!(false);
                    }}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}>
                    <View style={{ maxWidth: '90%', minWidth: '90%' }}>
                        <Text style={my_styles.input_text}>{grape_day_letter.value}</Text>
                    </View>
                </Pressable>
                <ShareComponent
                    btnSize={30} editMode={true}
                    grape_day_letter={grape_day_letter} setLoading={setLoading}
                />
            </View> : <BottomEditContainer
                grape_day_letter={grape_day_letter}
                setSelectedLetter={setSelectedLetter}
                inputRef={inputRef}
                setLoading={setLoading}
                setGrape={setGrape}
            />}
        </View>
    )
}