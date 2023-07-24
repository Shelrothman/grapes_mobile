import { Alert } from 'react-native';


export const showCancelConfirmDialog = (leaveCallback: () => void) => Alert.alert("Are you sure you want to cancel?",
    `If you go back, your words won't be saved.`, [
    { text: "Keep editing", style: "cancel", onPress: () => { return; } },
    { text: "Leave without saving", onPress: () => leaveCallback() },
]);