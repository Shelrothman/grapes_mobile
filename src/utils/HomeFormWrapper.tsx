import React, { useState, useRef } from "react";
import { TextInput, TextInputProps, View, Text, Pressable } from "react-native";
import { GRAPE_DAY } from "./constants";
import { defaultGrape } from "./constants";
import { Home_Grape } from "../types";
import { GrapeIcons } from "./Icons";
import { HomeService } from "../services/HomeService";
import { my_styles } from "../styles/my";
import { useAuthContext } from "../contexts/AuthProvider";
import { resToHomeGrape } from ".";
import { Octicons } from '@expo/vector-icons';

type FormRowWrapperProps = {
    label: string;
    formState: Home_Grape;
    setFormState: (formState: Home_Grape) => void;
}

//!! PU in here! this is ALMIOST done..just the "share" part.. lets instead move the share to the history page and they can share from there. WILL ALSO NEED TO CHANGE INSTRUCTIONS FOR THAT.
// * AND NOW EVERYTHING needs work bc using bottom tabs...

// TODO modulate and clean up this whole thing
// TODO come back and make the share button not look so bad...

/**
 * @description wrapper component for a home form row 
 * to render around each letter of Grape
 */
export function HomeFormWrapper({ label, setFormState, formState }: FormRowWrapperProps) {
    const [ aboutToFocus, setAboutToFocus ] = useState<boolean>(false);
    const [ inFocus, setInFocus ] = useState<boolean>(false); // this is for the multiline hack
    const { sessionUser } = useAuthContext();
    const inputRef = useRef<TextInput>(null);
    /** lowercase of the letter */
    const subKey: string = label.toLowerCase();

    const textInputProps: TextInputProps | Readonly<TextInputProps> = {
        style: {
            color: "white",
            // minHeight: height / 11.5, // make this dynamic based on screen size by using useWindowDimensions
            height: 'auto',
            width: '90%', // give room to the clearBtn
            padding: 10,
            backgroundColor: aboutToFocus ? '#3d5945' : undefined, // little effect for accessibility
        },
        selectionColor: '#cb9de2', placeholderTextColor: '#cb9de2',
        maxLength: 250, // between 35 words and 63 words👌
        multiline: true,
        /** @link https://github.com/facebook/react-native/issues/16826 */
        scrollEnabled: false, // this is the hack that makes it work WITH multiline //* keep in mind it only works for ios and now its making the clearButton not show up
        returnKeyLabel: 'done', // ? this is for ios only and isnt even working?
        // enablesReturnKeyAutomatically: true,
        keyboardType: 'default',
    };
    const handleOnEndEditing = () => {
        const inputValue = formState[ subKey ] || defaultGrape[ subKey ];
        if (inputValue.length <= 3) return; // dont send a blank thing
        if (inputValue === defaultGrape[ subKey ]) return; // its the same
        const homeService = new HomeService();
        const toSend = {
            letter: subKey,
            value: inputValue,
            user_id: sessionUser!.user_uid,
        };
        homeService.updateLetter(toSend).then((res) => {
            if (res !== null) {
                return setFormState(resToHomeGrape(res)); // set the grape in Home so that it updates before the refetch
            };
        }).catch((err: any) => {
            console.error(err);
            alert('Error updating grape, please try again.');
            return setFormState({ ...formState, [ subKey ]: defaultGrape[ subKey ] });
        });
    };


    const GrapeTitleComponent = (letter: string): JSX.Element => {
        letter = letter.toLowerCase();
        return <Text>
            <Text style={my_styles.titleLetterText}>
                {letter.toUpperCase()}
            </Text>
            <Text style={my_styles.titleText}>{GRAPE_DAY[ letter ]}</Text>
        </Text>;
    };

    const IconContainer = (containerOne: boolean, letter: string): JSX.Element => {
        const constainerStyle = containerOne ? my_styles.iconOne_container : my_styles.iconTwo_container;
        return <View style={constainerStyle}>
            <GrapeIcons letter={letter} color="#cb9De2" size={30} />
        </View>;
    };




    return (
        <>
            <View key={label} style={my_styles.card}>
                <View style={my_styles.titleContainer}>
                    {IconContainer(true, label)}
                    {GrapeTitleComponent(label)}
                    {IconContainer(false, label)}
                </View>
                <View style={my_styles.inputParent} key={`${label}-parent`}>
                    <TextInput
                        {...textInputProps}
                        ref={inputRef}
                        value={formState[ subKey ]} key={`${label}-input`}
                        onEndEditing={() => handleOnEndEditing()}
                        onChangeText={(text) => setFormState({ ...formState, [ subKey ]: text })}
                        onPressIn={() => setAboutToFocus(true)}
                        onPressOut={() => setAboutToFocus(false)}
                        onFocus={() => setInFocus(true)}
                        onBlur={() => setInFocus(false)}
                    />
                    {inFocus && <Pressable onPress={() => inputRef!.current!.clear()} style={my_styles.clearButtonParent} >
                        <Octicons name="x-circle-fill" size={16} color="#ccc8c8" />
                    </Pressable>}
                </View>
            </View>
            {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <View style={my_styles.shareBtn}>
                    <Text>Share</Text>
                </View>
            </View> */}
        </>
    )
}



