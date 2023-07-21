import { useState } from "react";
import { ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';
import { supabase } from '../../initSupabase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from "react-native-rapi-ui";
import { useAuthContext } from "../../contexts/AuthProvider";
import { AccountService } from "./services";
import Loading from "../../utils/Loading";
import { FormRowWrapper } from "../../utils/FormRowWrapper";
import { MyMap } from "../../utils/constants";


type FormState = MyMap & {
    /** the displayName for the user, defaults to their email */
    display: string;
    email: string;
    password: string;
};


// TODO deactive the save buttons if therye not changed? 
// TODO maybe use a toast for when the change is successful. like did in Global
// TODO ! change the password vlue of ******* bc it could send it *as* a password... but we check for that in the service... so may be okay

export function Account() {
    const { sessionUser } = useAuthContext();
    const [ loading, setLoading ] = useState<boolean>(false);
    const height = useHeaderHeight();
    // console.log("sessionUser", sessionUser)
    const [ formState, setFormState ] = useState<FormState>({
        display: sessionUser?.display_name || sessionUser?.email || "",
        email: sessionUser?.email || "",
        password: "********", 
    });

    const showConfirmDialog = (key: string) => Alert.alert("Are you sure?",
        `Are you sure you want to permanetly change your ${key === 'display' ? 'display name' : key}?`, [
        { text: "Cancel", style: "cancel", onPress: () => handleCancelClick(key) },
        {
            text: "OK", onPress: () => {
                setLoading(true);
                handleConfirmChange(key).finally(() => setLoading(false));
            }
        },
    ]);

    const showConfirmLogout = () => Alert.alert("Are you sure?",
        "Are you sure you want to sign out of your account?", [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: async () => await handleLogout() },
    ]);

    async function handleLogout() {
        const { error } = await supabase.auth.signOut();
        if (!error) alert("Signed out!");
        if (error) alert(error.message);
    };

    function handleCancelClick(key: string) {
        if (key === 'email') return setFormState({ ...formState, email: sessionUser?.email || "" });
        if (key === 'password') return setFormState({ ...formState, password: "********" });
        if (key === 'display') return setFormState({ ...formState, display: sessionUser?.display_name || sessionUser?.email || "" });
    };


    async function handleConfirmChange(key: string) {
        // console.log("formState", formState)
        const displayKey: string = key === 'display' ? 'display name' : key;
        try {
            const accountService = new AccountService();
            const user = await accountService.changeConfig(formState[ key ], key);
            if (user) return alert(`${displayKey} updated!`);
            else if (user == null) return alert(`Error updating ${displayKey}.`);
        } catch (error: any) {
            alert(`Error updating ${displayKey}: ${error.message}`);
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
                        onPress={() => showConfirmLogout()}
                    />
                    <FormRowWrapper label="Display Name" inputValue={formState.display}
                        onChangeText={(text) => setFormState({ ...formState, display: text })}
                        onButtonPress={() => showConfirmDialog('display')} key="display"
                    />
                    <FormRowWrapper label="Email" inputValue={formState.email}
                        onChangeText={(text) => setFormState({ ...formState, email: text })}
                        onButtonPress={() => showConfirmDialog('email')} key="email"
                    />
                    <FormRowWrapper label="Password" inputValue={formState.password}
                        onChangeText={(text) => setFormState({ ...formState, password: text })}
                        onButtonPress={() => showConfirmDialog('password')} key="password"
                    />
                </ScrollView>
            )}
        </KeyboardAvoidingView>
    )
}
