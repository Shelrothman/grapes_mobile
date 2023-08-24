import { View, Alert } from "react-native";
// import Toast, { ToastShowParams } from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { my_styles } from "../../styles/my";
import { GrapeDayLetter } from "../../types";
import { useAuthContext } from "../../contexts/AuthProvider";
// import { GlobalService } from "../../services/GlobalService";
import { ShareService } from "../../services/ShareService";

type ShareComponentProps = {
    /** indicates if in edit mode */
    editMode: boolean;
    btnSize: number;
    grape_day_letter: GrapeDayLetter;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    color?: string;
    // loading: boolean;
    // setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

// const toastProps: ToastShowParams = { position: 'top', visibilityTime: 4000, };


/** 
 * @component Share
 * @description a button and utility to share to the global feed
 * used in both the list in home and the individual letter edit view
 */
export function ShareComponent({ btnSize, grape_day_letter, setLoading, editMode, color }: ShareComponentProps) {
    const { sessionUser } = useAuthContext();

    const showConfirmDialog = () => Alert.alert("Ready to Submit?",
        `Confirm you are ready to share this letter to the global feed.`, [
        { text: "Cancel", style: "cancel", onPress: () => { return } },
        {
            text: "OK", onPress: () => {
                setLoading(true);
                // handleSharePress();
                ShareService.handleSharePress(setLoading, sessionUser!, grape_day_letter);
            }
        },
    ]);


    return (
        <View style={!editMode ? my_styles.share_container : my_styles.share_container_edit}>
            <Ionicons.Button name="md-share" size={btnSize} color={color ? color : '#a8e4a0'}
                backgroundColor='transparent'
                onPress={showConfirmDialog}
                style={{ padding: 0 }}
            />
        </View>
    );
}
