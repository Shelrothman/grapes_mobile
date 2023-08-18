import React, { useState, useRef } from "react";
import { TextInput, TextInputProps, View, Text, Button, Pressable } from "react-native";
import { MyMap, MyNumMap } from "./constants";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import { Octicons } from '@expo/vector-icons';
import { my_styles } from "../styles/my";


type FormRowWrapperProps = {
    label: string;
    onChangeText: (text: string) => void;
    onButtonPress: () => void;
    /** value for the textInput */
    inputValue: string;
    btnText: string;
    /** the initial value of the textInput */
    initialValue: string;
}

const HELP_TEXT: MyMap = { 'Display Name': "How your name appears in the global feed.", 'Email': "This is what you use to login. Press the button below to change it.", 'Password': '' };
const maxLength: MyNumMap = { 'Display Name': 8, 'Email': undefined, 'Password': 15, };


// TODO need to ensure that  the defaults arent getting sent without i knew it

//! PU here. do all the TODOS. but first.. fix the little X button to show inside the input

/**
 * @description wrapper component for a form row containing, label, input, helpText, and save button
 * mainly used in account screen but can be used elsewhere
 */
export function FormRowWrapper({ label, onChangeText, onButtonPress, inputValue, btnText, initialValue }: FormRowWrapperProps) {
    const [ showConfirm, setShowConfirm ] = useState<boolean>(false);
    const [ confirmValue, setConfirmValue ] = useState<string>('');
    const [ inFocus, setInFocus ] = useState<boolean>(false); // for the clear btn
    const [ inFocusConfirm, setInFocusConfirm ] = useState<boolean>(false); // for the clear btn
    const [ aboutToFocus, setAboutToFocus ] = useState<boolean>(false);
    const [ aboutToFocusConfirm, setAboutToFocusConfirm ] = useState<boolean>(false);

    const inputOneRef = useRef<TextInput>(null);
    const inputTwoRef = useRef<TextInput>(null);

    const reset = () => {
        setConfirmValue('');
        setShowConfirm(false);
        setInFocus(false);
    }

    useFocusEffect(
        React.useCallback(() => {
            reset();
            return () => reset();
        }, [])
    );



    const textInputProps: TextInputProps | Readonly<TextInputProps> = {
        autoCapitalize: "none",
        autoComplete: "off", autoCorrect: false,
        // style: {
        //     color: "white",
        //     height: 50, borderRadius: 10,
        //     paddingHorizontal: 10, marginTop: 15, borderColor: '#cb9de2', borderWidth: 1,
        //     width: '90%',
        //     // backgroundColor: (aboutToFocus && label !== 'Email') ? '#3d5945' : '#3d4b59', // little effect for accessibility
        // },
        selectionColor: '#cb9de2',
        placeholderTextColor: '#cb9de2',
        /** 
         *! this is the hack that makes it work WITH
         * @link  https://github.com/facebook/react-native/issues/16826 
         * * keep in mind it only works for ios
         * */
        scrollEnabled: false,
        returnKeyLabel: 'done', // ? this is for ios only and isnt even working?
    };

    const handleShowPassword = () => {
        if (!showConfirm) {
            if (inputValue.length < 8 || inputValue === initialValue) return alert('Password must be a new value and at least 8 characters long');
            return setShowConfirm(true);
        }
        if (inputValue !== confirmValue) {
            return alert('Password values do not match. Please try again');
        }
        return onButtonPress();
    }

    // TODO the clear buttons

    // TODO way need to modulate the repetitive view input view

    return (
        <View key={label} style={my_styles.account_card}>
            <View style={{ ...my_styles.titleContainer, backgroundColor: '#2E3944'  }}>

                <Text style={{ color: '#a8e4a0', }}>{label}</Text>
            </View>
            <View style={my_styles.inputParent} key={`${label}-parent`}>
                <TextInput
                    placeholder={`Enter your ${label}`}
                    ref={inputOneRef}
                    {...textInputProps} value={inputValue}
                    onPressIn={() => setAboutToFocus(true)}
                    onPressOut={() => setAboutToFocus(false)}
                    style={{
                        color: "white", width: '90%', height: 'auto', borderRadius: 10, padding: 10, 
                        backgroundColor: (aboutToFocus && label !== 'Email') ? '#3d5945' : '#3d4b59',
                    }}
                    onChangeText={onChangeText} key={`${label}-input`}
                    onFocus={() => setInFocus(true)}
                    onBlur={() => setInFocus(false)}
                    secureTextEntry={label !== 'New Password' ? false : true}
                    keyboardType={label === 'Email' ? 'email-address' : 'default'}
                    maxLength={maxLength[ label ]} editable={label === 'Email' ? false : true}
                />
                {inFocus && <Pressable onPress={() => inputOneRef!.current!.clear()} style={my_styles.clearButtonParent}>
                    <Octicons name="x-circle-fill" size={16} color="#ccc8c8" />
                </Pressable>}
            </View>
            {(showConfirm && label === 'New Password') && <>
                <Text style={{ color: '#a8e4a0', marginTop: 10 }}>Re-Enter New Password</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput
                        ref={inputTwoRef}
                        placeholder={`Confirm your ${label}`}
                        {...textInputProps} value={confirmValue}
                        onChangeText={(text) => setConfirmValue(text)}
                        key={`${label}-confirm`} secureTextEntry={true} maxLength={maxLength[ label ]}
                        onFocus={() => setInFocusConfirm(true)}
                        onBlur={() => setInFocusConfirm(false)}
                        onPressIn={() => setAboutToFocusConfirm(true)}
                        onPressOut={() => setAboutToFocusConfirm(false)}
                        style={{
                            color: "white", width: '100%', height: 50, borderRadius: 10,
                            paddingHorizontal: 10, marginTop: 15, borderColor: '#cb9de2', borderWidth: 1,
                            backgroundColor: aboutToFocusConfirm ? '#3d5945' : '#3d4b59',
                        }}
                    />
                    {inFocusConfirm && <Pressable onPress={() => inputTwoRef!.current!.clear()} style={{ justifyContent: "center", alignItems: "center", marginRight: 5, borderRadius: 50, }}>
                        <Octicons name="x-circle-fill" size={16} color="#ccc8c8" />
                    </Pressable>}
                </View>
            </>}
            <Text style={{ color: '#cb9de2', marginTop: 5, fontSize: 12, fontStyle: 'italic' }}>{HELP_TEXT[ label ]}</Text>
            <View style={{
                flexDirection: 'row', borderColor: '#4E1E66', borderWidth: 2,
                borderRadius: 10, backgroundColor: '#a8e4a0', alignSelf: 'flex-end',
                ...label !== 'New Password' ? { marginTop: 20 } : { marginTop: 0 },
                ...label === 'Email' && { paddingRight: 5 }
            }}>
                <Button
                    title={(showConfirm && label === 'New Password') ? 'Submit New Password' : btnText} key={`${label}-save`} color="#3d4b59"
                    onPress={label !== 'New Password' ? onButtonPress : handleShowPassword}
                />
                {label === 'Email' && <MaterialCommunityIcons name="open-in-new" size={25} color="#3d4b59" />}
            </View>
        </View>
    )
}



