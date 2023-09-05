import { View, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { my_styles } from "../../styles/my";
import { GrapeDayLetter } from "../../types";
import { useAuthContext } from "../../contexts/AuthProvider";
import { ShareService } from "../../services/ShareService";
import { defaultGrape } from "../../utils/constants";

type ShareComponentProps = {
    btnSize: number;
    grape_day_letter: GrapeDayLetter;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    color?: string;
};



/** 
 * @component Share
 * @description a button and utility to share to the global feed
 * used in both the list in home and the individual letter edit view
 */
export function ShareComponent({ btnSize, grape_day_letter, setLoading, color }: ShareComponentProps) {
    const { sessionUser } = useAuthContext();

    const showConfirmDialog = () => {
        if (defaultGrape[ grape_day_letter.letter ] === grape_day_letter.value) {
            return ShareService.handleUnchangedValue();
        }
        return Alert.alert("Ready to Submit?",
            `Confirm you are ready to share this letter to the global feed.`, [
            { text: "Cancel", style: "cancel", onPress: () => { return } },
            {
                text: "OK", onPress: () => {
                    setLoading(true);
                    ShareService.handleSharePress(setLoading, sessionUser!, grape_day_letter);
                }
            },
        ]);
    }


    return (
        <View style={my_styles.share_container}>
            <Ionicons.Button name="md-share" size={btnSize} color={color ? color : '#a8e4a0'}
                backgroundColor='transparent'
                onPress={showConfirmDialog}
                style={{ padding: 0 }}
            />
        </View>
    );
}
