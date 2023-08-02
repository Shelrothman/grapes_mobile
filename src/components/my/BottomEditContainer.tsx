import { useState } from "react";
import { View, TextInput } from "react-native";
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { my_styles } from "../../styles/my";
import { Grape, GrapeDayLetter } from "../../types";
import Toast, { ToastShowParams } from 'react-native-toast-message';
import { HomeService } from "../../services/HomeService";
import { useHomeGrapeContext } from "../../contexts/HomeGrapeContext";
import { useAuthContext } from "../../contexts/AuthProvider";
import { showCancelConfirmDialog } from "../../utils/GrapeAlerts";
import { resToGrape } from "../../utils";


type BottomEditContainerProps = {
    /** setGrape updates the grape in Home */
    setGrape: React.Dispatch<React.SetStateAction<Grape | null>>;
    grape_day_letter: GrapeDayLetter;
    setSelectedLetter: React.Dispatch<React.SetStateAction<GrapeDayLetter | null>>;
    // selectedLetter: GrapeDayLetter | null;
    inputRef: React.MutableRefObject<TextInput | null>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};


const toastProps: ToastShowParams = { position: 'top', visibilityTime: 4000, };

/**
 * @component BottomEditContainer
 * @description the bottom section of the MyGrape Letter box when in edit mode
 */
export function BottomEditContainer({
    grape_day_letter,
    setSelectedLetter,
    inputRef,
    setLoading,
    setGrape,
}: BottomEditContainerProps) {
    const { sessionUser } = useAuthContext();
    const { setTabBarEnabled } = useHomeGrapeContext();
    const [ inputValue, setInputValue ] = useState<string>(grape_day_letter.value);

    const exit = () => {
        setTabBarEnabled!(true);
        setSelectedLetter(null);
    };

    const successToast = () => Toast.show({
        type: 'success',
        text1: `Saved your letter: ${grape_day_letter.letter.toUpperCase()}!`,
        ...toastProps,
    });

    const errorToast = () => Toast.show({
        type: 'error',
        text1: 'Error saving letter!',
        text2: 'Try again later',
        ...toastProps,
    });

    function handleSaveClick() {
        if (inputValue === '') return alert('Cannot save an empty value');
        setLoading(true);
        const homeService = new HomeService();
        const toSend = { letter: grape_day_letter.letter, value: inputValue, user_id: sessionUser!.user_uid, };
        homeService.updateLetter(toSend).then((res) => {
            if (res !== null) {
                setGrape(resToGrape(res)) // set the grape in Home so that it updates before the refetch
                return successToast();
            }
            else return errorToast();
        }).catch((err: any) => {
            console.error(err);
            setLoading(false);
            return errorToast();
        }).finally(() => { setLoading(false); exit(); });
    }

    return (
        <View style={my_styles.bottomInEditContainer}>
            <TextInput multiline={true} numberOfLines={8}
                key={grape_day_letter.letter} style={my_styles.input_text}
                defaultValue={inputValue}
                ref={inputRef} onChangeText={(text) => setInputValue(text)}
                maxLength={1000}
            />
            <View style={my_styles.row}>
                <Ionicons.Button name="arrow-back-circle-outline" size={30} key="Cancel"
                    color="#cb9de2" backgroundColor="transparent"
                    style={my_styles.buttons}
                    onPress={() => showCancelConfirmDialog(exit)} />
                <FontAwesome5.Button name="eraser" size={30} key="Clear"
                    color="#cb9de2" backgroundColor="transparent"
                    style={my_styles.buttons} onPress={() => setInputValue('')}
                />
                <MaterialCommunityIcons.Button name="content-save-check-outline" size={35}
                    color="#a8e4a0" key="Save" backgroundColor="transparent"
                    style={my_styles.buttons} onPress={handleSaveClick}
                />
            </View>
        </View>
    );
}    