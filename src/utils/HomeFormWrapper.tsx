import React, { useState } from "react";
import { TextInput, TextInputProps, View, Text, Button, NativeSyntheticEvent, TextInputEndEditingEventData } from "react-native";
import { MyMap, MyNumMap, GRAPE_DAY } from "./constants";
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import { defaultGrape } from "./constants";
import { Home_Grape } from "../types";
import { GrapeIcons } from "./Icons";
import { HomeService } from "../services/HomeService";
import { my_styles } from "../styles/my";
import { useAuthContext } from "../contexts/AuthProvider";
import { resToHomeGrape } from ".";

type FormRowWrapperProps = {
    label: string;
    formState: Home_Grape;
    setFormState: (formState: Home_Grape) => void;
    onButtonPress: () => void;
}

//!! PU in here! this is ALMIOST done..just the "share" part.. lets instead move the share to the history page and they can share from there. WILL ALSO NEED TO CHANGE INSTRUCTIONS FOR THAT.
// TODO also jsut on press like on press of input have it highlight to light green just for  a moment.. but then back to normal as start typing into it

// TODO modulate and clean up this whole thing
/**
 * @description wrapper component for a home form row 
 * to render around each letter of Grape
 */
export function HomeFormWrapper({ label, onButtonPress, setFormState, formState }: FormRowWrapperProps) {
    const [ inFocus, setInFocus ] = useState<boolean>(false);
    const { sessionUser } = useAuthContext();

    // const [ showConfirm, setShowConfirm ] = useState<boolean>(false);
    // const [ confirmValue, setConfirmValue ] = useState<string>('');

    // const reset = () => { setConfirmValue(''); setShowConfirm(false); }

    // useFocusEffect(
    //     React.useCallback(() => {
    //         reset();
    //         return () => reset();
    //     }, [])

    // );


    /** lowercase of the letter */
    const subKey: string = label.toLowerCase();

    // WHy does the focused input not scroll into view?? i have this set up just like 

    const textInputProps: TextInputProps | Readonly<TextInputProps> = {
        style: {
            color: "white",
            height: 'auto',
            textAlign: 'left', // this makes the words wrap
            padding: 10,
            backgroundColor: inFocus ? '#cb9de2' : undefined,
        },
        // why is there weird vertical padding on top
        clearButtonMode: 'while-editing', // this may be most intuitive rather then clear right away?...
        // clearTextOnFocus: true,  //?
        textAlignVertical: 'top',
        selectionColor: '#cb9de2', placeholderTextColor: '#cb9de2',
        // multiline={true} //! this fucks up the keyboardAvoiding view scroll event
        maxLength: 250 // between 35 words and 63 words👌
    };

    const handleOnEndEditing = () => {
        // console.log(e)
        const inputValue = formState[ subKey ] || defaultGrape[ subKey ];
        console.log(inputValue);
        if (inputValue.length <= 3) {
            return; // dont send a blank thing
        }
        if (inputValue === defaultGrape[ subKey ]) {
            return; // its the same
        }
        // setLoading(true);
        const homeService = new HomeService();
        const toSend = {
            letter: subKey,
            value: inputValue,
            user_id: sessionUser!.user_uid,
        };
        homeService.updateLetter(toSend).then((res) => {
            if (res !== null) {
                // setGrape(resToGrape(res)) 
                // return successToast();
                return setFormState(resToHomeGrape(res)); // set the grape in Home so that it updates before the refetch
            }
            // else return errorToast();
        }).catch((err: any) => {
            console.error(err);
            setFormState({ ...formState, [ subKey ]: defaultGrape[ subKey ] });
            // setLoading(false);
            // return errorToast();
        }).finally(() => {
            // setLoading(false);
            // exit();
        });
        console.log('end edit')
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

    // TODO come back and make the share button not look so bad...

    return (
        <>
            <View key={label} style={my_styles.card}>
                <View style={my_styles.titleContainer}>
                    {IconContainer(true, label)}
                    {GrapeTitleComponent(label)}
                    {IconContainer(false, label)}
                </View>

                <TextInput
                    {...textInputProps}
                    value={formState[ subKey ]} key={`${label}-input`}
                    onEndEditing={() => handleOnEndEditing()}
                    onChangeText={(text) => setFormState({ ...formState, [ subKey ]: text })}
                />
            </View>
            {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <View style={my_styles.shareBtn}>
                    <Text>Share</Text>
                </View>
            </View> */}
        </>
    )
}



