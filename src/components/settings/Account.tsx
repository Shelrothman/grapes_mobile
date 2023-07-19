import { useState } from "react";
import { ScrollView, KeyboardAvoidingView, Platform, Alert, } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';
import { supabase } from '../../initSupabase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from "react-native-rapi-ui";
import { useAuthContext } from "../../contexts/AuthProvider";
import { useSupabase } from "../../hooks/useSupabase";
import { FormRowWrapper } from "../../utils/FormRowWrapper";
import { MyMap } from "../../utils/constants";
// TODO convert the site/redirect URLs to hold what im hosted on for when a password is changed -->
//! Consider setting up a custom SMTP server for better email deliverability on your project "grapes-backend" (vvjtgmzgmrunbhvshgxy). Check our Production Readiness guide: https://supabase.com/docs/guides/platform/going-into-prod


type FormState = MyMap & {
    displayName: string;
    email: string;
    password: string;
};

export function Account() {
    const { sessionUser } = useAuthContext();
    const { changeEmail, changePassword, changeDisplayName } = useSupabase();

    const [ formState, setFormState ] = useState<FormState>({
        //* Display name defaults to their email and then they have optuon in here to customize it
        displayName: sessionUser?.display_name || sessionUser?.email || "",
        email: sessionUser?.email || "",
        password: "********", // TODO ! change this bc it could send this *as* a password...
    });

    const showConfirmDialog = (key: string) => Alert.alert("Are you sure?", `Are you sure you want to permanetly change your ${key}?`, [
        { text: "Cancel", style: "cancel", onPress: () => handleCancelClick(key), },
        // TODO show loading spinner inbeterrn confirming and updating
        { text: "OK", onPress: () => handleConfirmChange(key), },
    ]);

    function handleCancelClick(key: string) {
        if (key === 'email') return setFormState({ ...formState, email: sessionUser?.email || "" });
        if (key === 'password') return setFormState({ ...formState, password: "********" });
        if (key === 'display name') return setFormState({ ...formState, displayName: sessionUser?.display_name || sessionUser?.email || "" });
    };
    function handleConfirmChange(key: string) {
        if (key === 'email') {
            return changeEmail(formState.email).then((user) => {
                if (user) alert("Email updated!")
                else alert("Error updating  email.");
            });
        }
        if (key === 'password') {
            return changePassword(formState.password).then((user) => {
                if (user) alert("Password updated!")
                else alert("Error updating password.");
            });
        }
        if (key === 'display name') {
            return changeDisplayName(formState.displayName).then((user) => {
                if (user) alert("Display name updated!")
                else alert("Error updating display name.");
            });
        }
    };

    const height = useHeaderHeight();

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled
            style={{ flex: 1, paddingHorizontal: 20 }} keyboardVerticalOffset={height + 200}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#2E3944", marginTop: 20, paddingBottom: 40 }} >
                <Button color="#3d4b59" text='Logout' size="md" style={{ marginBottom: 20, borderColor: '#4E1E66', borderWidth: 2 }} textStyle={{ color: 'white' }}
                    leftContent={<MaterialCommunityIcons name="logout" size={24} color="white" />}
                    onPress={async () => {
                        //TODO ? maybe add a confirm here?
                        const { error } = await supabase.auth.signOut();
                        if (!error) alert("Signed out!");
                        if (error) alert(error.message);
                    }}
                />
                {/* //TODO: maybe this could be modulated but not really going to mak a diff */}
                <FormRowWrapper label="Display Name" inputValue={formState.displayName}
                    onChangeText={(text) => setFormState({ ...formState, displayName: text })}
                    onButtonPress={() => showConfirmDialog('display name')}
                />
                <FormRowWrapper label="Email" inputValue={formState.email}
                    onChangeText={(text) => setFormState({ ...formState, email: text })}
                    onButtonPress={() => showConfirmDialog('email')}
                />
                <FormRowWrapper label="Password" inputValue={formState.password}
                    onChangeText={(text) => setFormState({ ...formState, password: text })}
                    onButtonPress={() => showConfirmDialog('password')}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
