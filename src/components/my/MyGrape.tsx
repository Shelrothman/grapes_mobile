import { useState } from "react";
import { View, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Grape, GrapeDayLetter } from "../../types";
import { MyGrapeLetter } from "./MyGrapeLetter";

type MyGrapeProps = {
    grape: Grape;
};


export function MyGrape({ grape }: MyGrapeProps) {

    const [ selectedLetter, setSelectedLetter ] = useState<GrapeDayLetter | null>(null);

    return (
        <View style={{ flex: 1, margin: 10 }}>
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
