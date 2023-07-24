import { useState } from "react";
import { View, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Grape, GrapeDayLetter } from "../../types";
import { MyGrapeLetter } from "./MyGrapeLetter";
import { ShareComponent } from "./Share";
import Loading from "../../utils/Loading";

type MyGrapeProps = {
    grape: Grape;
    /** shows the selected letter to be edited */
    selectedLetter: GrapeDayLetter | null;
    setSelectedLetter: React.Dispatch<React.SetStateAction<GrapeDayLetter | null>>;
};

export function MyGrape({ grape, selectedLetter, setSelectedLetter }: MyGrapeProps) {
    const [ loading, setLoading ] = useState<boolean>(false);


    return (
        <>
            {loading ? <Loading /> : (<View style={{ flex: 1 }}>
                {!selectedLetter ? (
                    <FlatList
                        data={grape.day}
                        renderItem={({ item }) => <MyGrapeLetter
                            grape_day_letter={item}
                            setLoading={setLoading}
                            setSelectedLetter={setSelectedLetter}
                            selectedLetter={selectedLetter}
                        />} showsVerticalScrollIndicator={false}
                    />) : (
                    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                        <SafeAreaView style={{ flex: 1 }}>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <MyGrapeLetter
                                    setLoading={setLoading}
                                    grape_day_letter={selectedLetter}
                                    selectedLetter={selectedLetter}
                                    setSelectedLetter={setSelectedLetter}
                                />
                            </TouchableWithoutFeedback>
                            <ShareComponent
                                btnSize={60}
                                grape_day_letter={selectedLetter}
                                setLoading={setLoading}
                                editMode={true}
                            />
                        </SafeAreaView>
                    </KeyboardAvoidingView>
                )}
            </View>)}
        </>
    );
};
