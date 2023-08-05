import { TextInput, TextInputProps, View, Text, Button } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MyMap, MyNumMap } from "./constants";

type FormRowWrapperProps = {
    label: string;
    onChangeText: (text: string) => void;
    onButtonPress: () => void;
    /** value for the textInput */
    inputValue: string;
}

const HELP_TEXT: MyMap = { 'Display Name': "How your name appears in the global feed.", 'Email': "Requires email confirmation for changes to take effect.", 'Password': '' };
const maxLength: MyNumMap = { 'Display Name': 8, 'Email': undefined, 'Password': 12, };


/**
 * @description wrapper component for a form row containing, label, input, helpText, and save button
 * mainly used in account screen but can be used elsewhere
 */
export function FormRowWrapper({ label, onChangeText, onButtonPress, inputValue, }: FormRowWrapperProps) {


    const textInputProps: TextInputProps | Readonly<TextInputProps> = {
        autoCapitalize: "none", autoComplete: "off", autoCorrect: false,
        style: {
            color: "#cb9de2", backgroundColor: "#4E1E66", height: 50, borderRadius: 10,
            paddingHorizontal: 10, marginTop: 15, borderColor: '#cb9de2', borderWidth: 1,
        },
        selectionColor: '#cb9de2', placeholderTextColor: '#cb9de2',
    };

    return (
        <View key={label}>
            <Text style={{ color: '#a8e4a0', }}>{label}</Text>
            <TextInput placeholder={`Enter your ${label}`} {...textInputProps} value={inputValue}
                onChangeText={onChangeText} key={`${label}-input`}
                secureTextEntry={label !== 'Password' ? false : true}
                keyboardType={label === 'Email' ? 'email-address' : 'default'}
                maxLength={maxLength[ label ]}
            />
            <Text style={{ color: '#cb9de2', marginTop: 5, fontSize: 12, fontStyle: 'italic' }}>{HELP_TEXT[ label ]}</Text>
            <View style={{
                borderColor: '#4E1E66',
                borderWidth: 2, 
                borderRadius: 10,
                backgroundColor: '#a8e4a0',
                alignSelf: 'flex-end',
                ...label !== 'Password' ? { marginTop: 20 } : { marginTop: 0 },
            }}>
                <Button title={`Save ${label}`} key={`${label}-save`} onPress={onButtonPress} color="#3d4b59" />
            </View>
        </View>
    )
}



