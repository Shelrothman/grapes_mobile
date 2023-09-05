import React, { useState, useRef } from "react";
import { TextInput, TextInputProps, View, Text, Pressable } from "react-native";
import { MyMap, MyNumMap } from "./constants";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import { Octicons } from '@expo/vector-icons';
import { my_styles } from "../styles/my";
import { Button } from 'react-native-rapi-ui';

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

/**
 * @description wrapper component for a form row containing, label, input, helpText, and save button
 * mainly used in account screen but can be used elsewhere
 */
export function FormRowWrapper({ label, onChangeText, onButtonPress, inputValue, btnText, initialValue }: FormRowWrapperProps) {
    const [ showConfirm, setShowConfirm ] = useState<boolean>(false);
    const [ confirmValue, setConfirmValue ] = useState<string>('');
    const [ inFocus, setInFocus ] = useState<boolean>(false); // for the clear btn
    const [ inFocusConfirm, setInFocusConfirm ] = useState<boolean>(false); // for the clear btn
    const inputOneRef = useRef<TextInput>(null);
    const inputTwoRef = useRef<TextInput>(null);

    const reset = () => { setConfirmValue(''); setShowConfirm(false); setInFocus(false); }

    useFocusEffect(
        React.useCallback(() => {
            reset();
            return () => reset();
        }, [])
    );

    const textInputProps: TextInputProps | Readonly<TextInputProps> = {
        autoCapitalize: "none", autoComplete: "off", autoCorrect: false, selectionColor: '#4E1E66',
        placeholderTextColor: '#c6bfc9', scrollEnabled: false, returnKeyLabel: 'done',
        style: { color: "white", width: '90%', height: 'auto', borderRadius: 10, padding: 10, fontFamily: 'Body-Reg', },
        returnKeyType: "done"
    };

    const handleShowPassword = () => {
        if (!showConfirm) {
            if (inputValue.length < 8 || inputValue === initialValue) return alert('Password must be a new value and at least 8 characters long');
            return setShowConfirm(true);
        }
        if (inputValue !== confirmValue) return alert('Password values do not match. Please try again');
        return onButtonPress();
    }

    return (
        <View key={label} style={my_styles.account_card}>
            <View style={{ ...my_styles.titleContainer, backgroundColor: '#1a1e47', borderBottomWidth: 0 }}>
                <Text style={{ color: '#a8e4a0', fontFamily: 'Body-Reg', }}>{label}</Text>
            </View>
            <View style={{ ...my_styles.inputParent, borderColor: '#474115', borderWidth: .5 }} key={`${label}-parent`}>
                <TextInput
                    placeholder={`Enter your ${label}`} ref={inputOneRef}
                    {...textInputProps} value={inputValue}
                    onChangeText={onChangeText} key={`${label}-input`}
                    onFocus={() => setInFocus(true)} onBlur={() => setInFocus(false)}
                    secureTextEntry={label !== 'New Password' ? false : true}
                    keyboardType={label === 'Email' ? 'email-address' : 'default'}
                    maxLength={maxLength[ label ]} editable={label === 'Email' ? false : true}
                />
                {inFocus && <Pressable onPress={() => inputOneRef!.current!.clear()} style={my_styles.clearButtonParent}>
                    <Octicons name="x-circle-fill" size={16} color="#ccc8c8" />
                </Pressable>}
            </View>
            {(showConfirm && label === 'New Password') && <>
                <Text style={{ color: '#a8e4a0', marginTop: 10, fontFamily: 'Body-Reg', }}>Re-Enter New Password</Text>
                <View style={{ ...my_styles.inputParent, borderColor: '#a8e4a0', borderWidth: .5 }} key={`${label}-parent`}>
                    <TextInput
                        ref={inputTwoRef} placeholder={`Confirm your ${label}`}
                        {...textInputProps} value={confirmValue} onChangeText={(text) => setConfirmValue(text)}
                        key={`${label}-confirm`} secureTextEntry={true} maxLength={maxLength[ label ]}
                        onFocus={() => setInFocusConfirm(true)} onBlur={() => setInFocusConfirm(false)}
                    />
                    {inFocusConfirm && <Pressable onPress={() => inputTwoRef!.current!.clear()} style={{ justifyContent: "center", alignItems: "center", marginRight: 5, borderRadius: 50, }}>
                        <Octicons name="x-circle-fill" size={16} color="#ccc8c8" />
                    </Pressable>}
                </View>
            </>}
            <Text style={{ color: '#c6bfc9', marginTop: 5, fontSize: 12, fontFamily: 'Reg-Italic', }}>{HELP_TEXT[ label ]}</Text>
            <View style={{ alignSelf: 'flex-end', ...label !== 'New Password' ? { marginTop: 20 } : { marginTop: 0 }, ...label === 'Email' && { paddingRight: 5 } }}>
                <Button
                    color="#3d4b59" key={`${label}-save`}
                    style={{ borderRadius: 10, backgroundColor: '#3d4b59', borderColor: '#a8e4a0', borderWidth: 1, }}
                    onPress={label !== 'New Password' ? onButtonPress : handleShowPassword}
                    rightContent={label === 'Email' && <MaterialCommunityIcons name="open-in-new" size={22} color="#a8e4a0" style={{ backgroundColor: '#3d4b59', fontFamily: 'Body-Reg', }} />}
                    leftContent={<Text style={{ color: '#a8e4a0', fontFamily: 'Grape-Header-b', fontSize: 14, backgroundColor: '#3d4b59', }}>
                        {(showConfirm && label === 'New Password') ? 'Submit New Password' : btnText}
                    </Text>}
                />
            </View>
        </View>
    )
}



