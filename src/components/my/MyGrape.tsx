import { View, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Grape, GrapeDayLetter } from "../../types";
import { MyGrapeLetter } from "./MyGrapeLetter";
import { Ionicons } from '@expo/vector-icons';


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
                            {/* <View style={styles.share_container}> */}
                        </TouchableWithoutFeedback>
                        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                            <Ionicons.Button name="md-share" size={60} color="#a8e4a0"
                                backgroundColor='transparent' onPress={() => console.log('share')}
                                style={{ padding: 0 }}
                            />
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            )}
        </View>
    );
};
