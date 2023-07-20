import { useState } from "react";
import { ScrollView, KeyboardAvoidingView, Platform, Alert, } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';
import { supabase } from '../../initSupabase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from "react-native-rapi-ui";
import { useAuthContext } from "../../contexts/AuthProvider";
// import { useSupabase } from "../../hooks/useSupabase";
import { AccountService } from "./services";
// import { ActivityIndicator } from "react-native";
import Loading from "../../utils/Loading";
import { FormRowWrapper } from "../../utils/FormRowWrapper";
import { MyMap } from "../../utils/constants";
// TODO convert the site/redirect URLs to hold what im hosted on for when a password is changed -->
//! Consider setting up a custom SMTP server for better email deliverability on your project "grapes-backend" (vvjtgmzgmrunbhvshgxy). Check our Production Readiness guide: https://supabase.com/docs/guides/platform/going-into-prod


type FormState = MyMap & {
    /** the displayName for the user, defaults to their email */
    display: string;
    email: string;
    password: string;
};


// TODO deactive the save buttons if therye not changed
// TODO maybe use a toast for when the change is successful. like done in Global

export function Account() {
    const { sessionUser } = useAuthContext();
    const [ loading, setLoading ] = useState<boolean>(false);
    const height = useHeaderHeight();
    const [ formState, setFormState ] = useState<FormState>({
        display: sessionUser?.display_name || sessionUser?.email || "",
        email: sessionUser?.email || "",
        password: "********", // TODO ! change this bc it could send this *as* a password...
    });

    const showConfirmDialog = (key: string) => Alert.alert("Are you sure?", `Are you sure you want to permanetly change your ${key === 'display' ? 'display name' : key}?`, [
        { text: "Cancel", style: "cancel", onPress: () => handleCancelClick(key) },
        // TODO show loading spinner inbeterrn confirming and updating
        {
            text: "OK", onPress: () => {
                setLoading(true);
                handleConfirmChange(key).finally(() => setLoading(false));
            },
        },
    ]);

    function handleCancelClick(key: string) {
        if (key === 'email') return setFormState({ ...formState, email: sessionUser?.email || "" });
        if (key === 'password') return setFormState({ ...formState, password: "********" });
        if (key === 'display') return setFormState({ ...formState, display: sessionUser?.display_name || sessionUser?.email || "" });
    };

    async function handleConfirmChange(key: string) {
        // console.log("formState", formState)
        try {
            const accountService = new AccountService();
            const user = await accountService.changeConfig(formState[ key ], key);
            if (user) return alert(`${key} updated!`);
            else if (user == null) return alert(`Error updating ${key}.`);
        } catch (error: any) {
            // console.log("error", error)
            alert(error.message);
            return handleCancelClick(key); // reset the value back
        }
    };


    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled
            style={{ flex: 1, paddingHorizontal: 20 }} keyboardVerticalOffset={height + 200}
        >
            {loading ? <Loading /> : (
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
                    <FormRowWrapper label="Display Name" inputValue={formState.display}
                        onChangeText={(text) => setFormState({ ...formState, display: text })}
                        onButtonPress={() => showConfirmDialog('display')}
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
            )}
        </KeyboardAvoidingView>
    )
}
