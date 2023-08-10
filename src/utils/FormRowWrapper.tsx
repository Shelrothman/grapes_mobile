import React, { useState } from "react";
import { TextInput, TextInputProps, View, Text, Button } from "react-native";
import { MyMap, MyNumMap } from "./constants";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";

type FormRowWrapperProps = {
    label: string;
    onChangeText: (text: string) => void;
    onButtonPress: () => void;
    /** value for the textInput */
    inputValue: string;
    btnText: string;
}

const HELP_TEXT: MyMap = { 'Display Name': "How your name appears in the global feed.", 'Email': "This is what you use to login. Press the button below to change it.", 'Password': '' };
const maxLength: MyNumMap = { 'Display Name': 8, 'Email': undefined, 'Password': 15, };


/**
 * @description wrapper component for a form row containing, label, input, helpText, and save button
 * mainly used in account screen but can be used elsewhere
 */
export function FormRowWrapper({ label, onChangeText, onButtonPress, inputValue, btnText }: FormRowWrapperProps) {
    const [ showConfirm, setShowConfirm ] = useState<boolean>(false);
    const [ confirmValue, setConfirmValue ] = useState<string>('');

    useFocusEffect(
        React.useCallback(() => {
            setShowConfirm(false);
            setConfirmValue('');
            return () => {
                setShowConfirm(false);
                setConfirmValue('');
            };
        }, [])
    );

    const textInputProps: TextInputProps | Readonly<TextInputProps> = {
        autoCapitalize: "none", autoComplete: "off", autoCorrect: false,
        style: {
            color: "#cb9de2", backgroundColor: "#4E1E66", height: 50, borderRadius: 10,
            paddingHorizontal: 10, marginTop: 15, borderColor: '#cb9de2', borderWidth: 1,
        },
        selectionColor: '#cb9de2', placeholderTextColor: '#cb9de2',
    };

    const handlePassword = () => {
        if (inputValue !== confirmValue) {
            return alert('Password values do not match. Please try again');
        }
        return onButtonPress();
    }

    return (
        <View key={label}>
            <Text style={{ color: '#a8e4a0', }}>{label}</Text>
            <TextInput
                placeholder={`Enter your ${label}`} {...textInputProps} value={inputValue}
                onChangeText={onChangeText} key={`${label}-input`}
                secureTextEntry={label !== 'Password' ? false : true}
                keyboardType={label === 'Email' ? 'email-address' : 'default'}
                maxLength={maxLength[ label ]}
                editable={label === 'Email' ? false : true}
                onTouchStart={label === 'Password' ? () => setShowConfirm(true) : undefined}
            />
            {(showConfirm && label === 'Password') && <>
                <Text style={{ color: '#a8e4a0', marginTop: 10 }}>Confirm New Password</Text>
                <TextInput
                    placeholder={`Confirm your ${label}`}
                    {...textInputProps} value={confirmValue}
                    onChangeText={(text) => setConfirmValue(text)}
                    key={`${label}-confirm`} secureTextEntry={true} maxLength={maxLength[ label ]}
                />
            </>}
            <Text style={{ color: '#cb9de2', marginTop: 5, fontSize: 12, fontStyle: 'italic' }}>{HELP_TEXT[ label ]}</Text>
            <View style={{
                flexDirection: 'row', borderColor: '#4E1E66', borderWidth: 2,
                borderRadius: 10, backgroundColor: '#a8e4a0', alignSelf: 'flex-end',
                ...label !== 'Password' ? { marginTop: 20 } : { marginTop: 0 },
                ...label === 'Email' && { paddingRight: 5 }
            }}>
                <Button
                    title={btnText} key={`${label}-save`} color="#3d4b59"
                    onPress={label !== "Password" ? onButtonPress : handlePassword}
                />
                {label === 'Email' && <MaterialCommunityIcons name="open-in-new" size={25} color="#3d4b59" />}
            </View>
        </View>
    )
}



