import React, { useState, useRef } from "react";
import { TextInput, TextInputProps, View, Text, useWindowDimensions, Button, TouchableOpacity, Pressable, Keyboard } from "react-native";
import { MyMap, MyNumMap, GRAPE_DAY } from "./constants";
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { useFocusEffect } from "@react-navigation/native";
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
    // onButtonPress: () => void;
}

//!! PU in here! this is ALMIOST done..just the "share" part.. lets instead move the share to the history page and they can share from there. WILL ALSO NEED TO CHANGE INSTRUCTIONS FOR THAT.
// TODO also jsut on press like on press of input have it highlight to light green just for  a moment.. but then back to normal as start typing into it
// !! PU! the stupid clear btn doesnt work with multiline-true.


// * AND NOW EVERYTHING needs work bc using bottom tabs...

// TODO modulate and clean up this whole thing
/**
 * @description wrapper component for a home form row 
 * to render around each letter of Grape
 */
export function HomeFormWrapper({ label, setFormState, formState }: FormRowWrapperProps) {
    const [ inFocus, setInFocus ] = useState<boolean>(false);
    const { sessionUser } = useAuthContext();
    // const { height, width } = useWindowDimensions();
    const inputRef = useRef<TextInput>(null);
    /** lowercase of the letter */
    const subKey: string = label.toLowerCase();
    // console.log('window height', height);
    const textInputProps: TextInputProps | Readonly<TextInputProps> = {
        style: {
            color: "white",
            // minHeight: height / 11.5, // make this dynamic based on screen size by using useWindowDimensions
            height: 'auto',
            width: '90%', // give room to the clearBtn
            // textAlign: 'left', // this makes the words wrap .. well now all a sudden its not.
            position: 'relative', // this is for the clear button
            padding: 10,
            // backgroundColor: 'yellow'
            // backgroundColor: inFocus ? '#cb9de2' : undefined,
        },
        // clearButtonMode: 'while-editing', // only qoeka is multiline is FALSE .. WTF
        // clearButtonMode: 'always', // why isnt this showing? is it bc of the multiline?
        // clearTextOnFocus: true,  //? this may be most intuitive rather then clear right away?...or else itll just clear on accidental pressing
        // textAlignVertical: 'top',
        selectionColor: '#cb9de2', placeholderTextColor: '#cb9de2',
        maxLength: 250, // between 35 words and 63 words👌
        
        multiline: true,
        // multiline: !inFocus,
        scrollEnabled: false, // this is the hack that makes it work WITH multiline //* keep in mind it only works for ios and now its making the clearButton not show up
        /** @link https://github.com/facebook/react-native/issues/16826 */
        // returnKeyLabel: 'done',
        // enablesReturnKeyAutomatically: true,
        keyboardType: 'default',
    };
    const handleOnEndEditing = () => {
        // console.log(e)
        const inputValue = formState[ subKey ] || defaultGrape[ subKey ];
        // console.log(inputValue);
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
                return setFormState(resToHomeGrape(res)); // set the grape in Home so that it updates before the refetch
            };
        }).catch((err: any) => {
            console.error(err);
            alert('Error updating grape, please try again.');
            return setFormState({ ...formState, [ subKey ]: defaultGrape[ subKey ] });
        });
        // console.log('end edit')
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


    // const renderClearButton = () => {
    //     if (inFocus) {
    //         return (
    //             <Pressable onPress={() => {
    //                 setFormState({ ...formState, [ subKey ]: '' })
    //             }}
    //                 style={my_styles.clearButtonParent}
    //             >
    //                 <Text style={my_styles.clearButton}>&#10754;</Text>
    //             </Pressable>
    //         )
    //     } else {
    //         return <></>;
    //     }
    // };

    // TODO come back and make the share button not look so bad...


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
                        onFocus={() => setInFocus(true)}
                        onBlur={() => setInFocus(false)}
                    />
                    <Pressable onPress={() => {
                        // inputRef!.current!.focus();
                        inputRef!.current!.clear();
                        // setFormState({ ...formState, [ subKey ]: '' })
                    }}
                        style={my_styles.clearButtonParent}
                    >
                        <Text style={my_styles.clearButton}>&#10754;</Text>
                    </Pressable>
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



