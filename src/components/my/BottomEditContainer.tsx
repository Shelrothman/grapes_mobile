/**
 * @component BottomEditContainer
 * @description the bottom section of the MyGrape Letter box when in edit mode
 */

import { View, TextInput } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function BottomEditContainer() {
    return (
        <View style={styles.bottomInEditContainer}>
            <TextInput
                multiline={true}
                numberOfLines={8}
                key={grape_day_letter.letter}
                style={styles.input_text}
                defaultValue={grape_day_letter.value}
                //? value={selectedLetter.value}
                ref={inputRef}
            // onChangeText={(text) => {
            // acually we should do this on click of the save
            // setMyGrapeLetter({ letter: grape_day_letter.letter, value: text });
            // }}
            />
            <View style={styles.row}>
                <MaterialIcons.Button name="cancel" size={30} key="Cancel"
                    color="#cb9de2" backgroundColor="transparent"
                    style={styles.buttons}
                    onPress={() => {
                        setSelectedLetter(null)
                        // setCurrentLetter_edit(null);
                    }}
                />
                {/* //TODO add a confirmation button on cancle click */}
                <MaterialCommunityIcons.Button name="content-save-check-outline" size={30}
                    color="#cb9de2" key="Save"
                    backgroundColor="transparent"
                    style={styles.buttons}
                    onPress={() => console.log('save')}
                // onPress={() => setMyGrapeLetter({ letter: grape_day_letter.letter, value: inputRef.current?.value || '' })}
                />
            </View>
        </View>
    );
}    