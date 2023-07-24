import { View, Alert } from "react-native";
import Toast, { ToastShowParams } from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { my_styles } from "../../styles/my";
import { GrapeDayLetter } from "../../types";
import { useAuthContext } from "../../contexts/AuthProvider";
import { GlobalService } from "../../services/GlobalService";


type ShareComponentProps = {
    /** indicates if in edit mode */
    editMode: boolean;
    btnSize: number;
    grape_day_letter: GrapeDayLetter;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const toastProps: ToastShowParams = { position: 'top', visibilityTime: 4000, };


/** 
 * @component Share
 * @description a button and utility to share to the global feed
 * used in both the list in home and the individual letter edit view
 */
export function ShareComponent({ btnSize, grape_day_letter, setLoading, editMode }: ShareComponentProps) {
    const { sessionUser } = useAuthContext();

    const showConfirmDialog = () => Alert.alert("Ready to Submit?",
        `Confirm you ready to share this letter.`, [
        { text: "Cancel", style: "cancel", onPress: () => { return } },
        {
            text: "OK", onPress: () => {
                setLoading(true);
                handleSharePress();
            }
        },
    ]);

    function handleSharePress() {
        const globalService = new GlobalService();
        const toShare = { ...grape_day_letter, user_name: sessionUser!.display_name };
        globalService.addRow(toShare).then((res) => {
            // console.log('res from addRow', res);
            return Toast.show({
                type: 'success',
                text1: 'Shared to the Global feed!',
                text2: 'Check it out ->',
                ...toastProps,
            });
        }).catch((err: any) => {
            console.error(err);
            return Toast.show({
                type: 'error',
                text1: 'Error sharing to the Global feed!',
                text2: 'Try again later',
                ...toastProps,
            });
        }).finally(() => setLoading(false));
    }



    return (
        <View style={!editMode ? my_styles.share_container : my_styles.share_container_edit}>
            <Ionicons.Button name="md-share" size={btnSize} color="#a8e4a0"
                backgroundColor='transparent'
                onPress={showConfirmDialog}
                style={{ padding: 0 }}
            />
        </View>
    );
}
