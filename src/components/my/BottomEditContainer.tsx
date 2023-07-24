import { View, TextInput, Alert } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { my_styles } from "../../styles/my";
import { GrapeDayLetter } from "../../types";
import Toast, { ToastShowParams } from 'react-native-toast-message';
import { HomeService } from "../../services/HomeService";
import { useHomeGrapeContext } from "../../contexts/HomeGrapeContext";
import { useAuthContext } from "../../contexts/AuthProvider";
import { showCancelConfirmDialog } from "../../utils/GrapeAlerts";


type BottomEditContainerProps = {
    grape_day_letter: GrapeDayLetter;
    setSelectedLetter: React.Dispatch<React.SetStateAction<GrapeDayLetter | null>>;
    // selectedLetter: GrapeDayLetter | null;
    inputRef: React.MutableRefObject<TextInput | null>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

// TODO need to add limit to amount of characters in the input

// TODO this could be a constant
const toastProps: ToastShowParams = { position: 'top', visibilityTime: 4000, };

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
    const { sessionUser } = useAuthContext();
    const { setHomeSwipeEnabled, today_grape } = useHomeGrapeContext();
    // TODO in here we do the inserting/updating tp the db

    const exit = () => { setHomeSwipeEnabled!(true); setSelectedLetter(null); };

    // const showSaveConfirmDialog = () => Alert.alert("Are you sure you want to save?",

    function handleSaveClick() {
        setLoading(true);
        // maybe no confirm here just show the Toast... and then exit/
        // so first it Posts the data
        const homeService = new HomeService();
        // homeService.updateRow(grape_day_letter).then((res) => {
        // check it exists yet first bc depending on the letter it may already be there
        const toSend = {
            letter: grape_day_letter.letter,
            // @ts-ignore
            value: inputRef?.current?.value || '',
            user_id: sessionUser!.user_uid,
        }

        homeService.updateLetter(toSend).then((res) => {
            console.log('res from updateLetter', res);
            return Toast.show({
                type: 'success',
                text1: `Saved your letter: ${grape_day_letter.letter}!`,
                ...toastProps,
            });
        }).catch((err: any) => {
            console.error(err);
            setLoading(false);
            return Toast.show({
                type: 'error',
                text1: 'Error saving letter!',
                text2: 'Try again later',
                ...toastProps,
            });
        }).finally(() => { setLoading(false); exit(); });

        // then the toast/
        // then exit and setLoading(false)
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
                    onPress={() => showCancelConfirmDialog(exit)}
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