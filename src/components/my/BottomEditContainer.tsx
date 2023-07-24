import { View, TextInput, Alert } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { my_styles } from "../../styles/my";
import { GrapeDayLetter } from "../../types";
import { HomeService } from "../../services/HomeService";

type BottomEditContainerProps = {
    grape_day_letter: GrapeDayLetter;
    setSelectedLetter: React.Dispatch<React.SetStateAction<GrapeDayLetter | null>>;
    // selectedLetter: GrapeDayLetter | null;
    inputRef: React.MutableRefObject<TextInput | null>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

// TODO need to add limit to amount of characters in the input

/**
 * @component BottomEditContainer
 * @description the bottom section of the MyGrape Letter box when in edit mode
 */
export function BottomEditContainer({
    grape_day_letter,
    setSelectedLetter,
    // selectedLetter,
    inputRef,
    setLoading,
}: BottomEditContainerProps) {

    // TODO in here we do the inserting/updating tp the db
    // * when do we safve it on edit/// or on save click.. or.. on cancle click we need confirms for each and yea yea 


    // TODO: this could be a custom hook or global service
    const showCancelConfirmDialog = () => Alert.alert("Are you sure you want to cancel?",
        `If you go back, your words won't be saved.`, [
        { text: "Keep editing", style: "cancel", onPress: () => { return; } },
        { text: "Leave without saving", onPress: () => setSelectedLetter(null) },
    ]);

    // function handleCancelClick() {
    //     setSelectedLetter(null);
    // }

    function handleSaveClick() {
    
        console.log('save clicked');
    }

    return (
        <View style={my_styles.bottomInEditContainer}>
            <TextInput
                multiline={true}
                numberOfLines={8}
                key={grape_day_letter.letter}
                style={my_styles.input_text}
                defaultValue={grape_day_letter.value}
                //? value={selectedLetter.value}
                ref={inputRef}
            // onChangeText={(text) => {
            // acually we should do this on click of the save
            // setMyGrapeLetter({ letter: grape_day_letter.letter, value: text });
            // }}
            />
            <View style={my_styles.row}>
                <MaterialIcons.Button name="cancel" size={30} key="Cancel"
                    color="#cb9de2" backgroundColor="transparent"
                    style={my_styles.buttons}
                    onPress={showCancelConfirmDialog}

                // onPress={() => { setSelectedLetter(null) }}
                />
                {/* //TODO add a confirmation button on cancle click */}
                <MaterialCommunityIcons.Button name="content-save-check-outline" size={30}
                    color="#cb9de2" key="Save"
                    backgroundColor="transparent"
                    style={my_styles.buttons}
                    onPress={handleSaveClick}
                // onPress={() => console.log('save')}
                // onPress={() => setMyGrapeLetter({ letter: grape_day_letter.letter, value: inputRef.current?.value || '' })}
                />
            </View>
        </View>
    );
}    