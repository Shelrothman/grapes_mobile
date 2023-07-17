import { useState } from "react";
import { View, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Grape, GrapeDayLetter } from "../../types";
import { MyGrapeLetter } from "./MyGrapeLetter";

type MyGrapeProps = {
    grape: Grape;
    /** shows the selected letter to be edited */
    selectedLetter: GrapeDayLetter | null;
    setSelectedLetter: React.Dispatch<React.SetStateAction<GrapeDayLetter | null>>;
};

// ! PU HERE and do:
// TODO.. now work on that one off letter edit Letter transition thang.
// have it look more in sync like in hre and then the share button icon gets big

export function MyGrape({ grape, selectedLetter, setSelectedLetter }: MyGrapeProps) {

    // const [ selectedLetter, setSelectedLetter ] = useState<GrapeDayLetter | null>(null);

    return (
        <View style={{ flex: 1 }}>
            {!selectedLetter ? (
                <FlatList
                    data={grape.day}
                    renderItem={({ item }) => <MyGrapeLetter
                        grape_day_letter={item}
                        setSelectedLetter={setSelectedLetter}
                        selectedLetter={selectedLetter}
                    />} showsVerticalScrollIndicator={false}
                />) : (
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <MyGrapeLetter
                                grape_day_letter={selectedLetter}
                                selectedLetter={selectedLetter}
                                setSelectedLetter={setSelectedLetter}
                            />
                        </TouchableWithoutFeedback>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            )}
        </View>
    );
};
