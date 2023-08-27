import React, { useState, useRef } from "react";
import { TextInput, View, Text, Pressable, Keyboard, TextInputProps } from "react-native";
import { GRAPE_DAY } from "./constants";
import { Home_Grape } from "../types";
import { GrapeIcons } from "./Icons";
import { my_styles } from "../styles/my";
import { useAuthContext } from "../contexts/AuthProvider";
import { Octicons } from '@expo/vector-icons';
import { HomePageService } from "../services/ui";
import { LetterHeader } from "./LetterHeader";

type FormRowWrapperProps = {
    label: string;
    formState: Home_Grape;
    setFormState: React.Dispatch<React.SetStateAction<Home_Grape | null>>;
}


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

    const handleOnEndEditing = () => {
        HomePageService.handleOnEndEditing(formState, setFormState, subKey, sessionUser!.user_uid);
    };

    const textInputProps: TextInputProps | Readonly<TextInputProps> = {
        style: {
            fontSize: 16,
            color: "white", height: 'auto', padding: 10, fontFamily: 'Body-Reg',
            width: '90%', // give room to the clearBtn
            backgroundColor: aboutToFocus ? '#3d5945' : undefined, // little effect for accessibility
        },
        selectionColor: '#c6bfc9', placeholderTextColor: '#c6bfc9',
        maxLength: 250, // between 35 words and 63 words👌
        /**
         * !this is the hack that makes it work WITH multiline 
         * * keep in mind `scrollEnabled` only works for ios
         *  @link https://github.com/facebook/react-native/issues/16826 
         * */
        scrollEnabled: false, multiline: true,
        returnKeyType: 'done', keyboardType: 'default', blurOnSubmit: true,
    };

    return (
        <View key={label} style={my_styles.card}>
            {/* <View style={my_styles.titleContainer}>
                {IconContainer(true, label)}{GrapeTitleComponent(label)}{IconContainer(false, label)}
            </View> */}
            <LetterHeader label={label} />
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
                    onSubmitEditing={() => Keyboard.dismiss()}
                />
                {inFocus && <Pressable onPress={() => inputRef!.current!.clear()} style={my_styles.clearButtonParent} >
                    <Octicons name="x-circle-fill" size={16} color="#ccc8c8" />
                </Pressable>}
            </View>
        </View>
    )
}



