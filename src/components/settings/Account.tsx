import { useState, useCallback } from "react";
import {
    ScrollView, View, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TextInputProps,
    Alert
} from "react-native";
import { supabase } from '../../initSupabase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Layout, Text, Button } from "react-native-rapi-ui";
// i think text from rapi-ui auto word wraps

import { useAuthContext } from "../../contexts/AuthProvider";
import { useSupabase } from "../../hooks/useSupabase";


// TODO convert the site/redirect URLs to hold what im hosted on for when a password is changed -->
//! Consider setting up a custom SMTP server for better email deliverability on your project "grapes-backend" (vvjtgmzgmrunbhvshgxy). Check our Production Readiness guide: https://supabase.com/docs/guides/platform/going-into-prod


//* Display name defaults to their email and then they have optuon in here to customize it

// TODO fix the excess top margin above the logout button and also figure out why it does NOT do the avoiding view thing for the Password input.. It works for the login.tsx so use that to see

// !!!!!!!!!!!!!!!!!!!!!!!!!
// ! PU here and get the user data from the database or however and display it here!
//*  maybe use a method in the provider to get the user data and then pass it down to here

// TODO confirmation messages

// TODO lots of modularization, services file, modulate allll thes parts out before moving on to new things
export function Account() {
    const { sessionUser } = useAuthContext();
    // console.log("sessionUser: ", sessionUser);
    const { changeEmail, changePassword, changeDisplayName } = useSupabase();

    // const [ confirmChange, setConfirmChange ] = useState<boolean>(false);

    const [ formState, setFormState ] = useState({
        displayName: sessionUser?.display_name || sessionUser?.email || "",
        email: sessionUser?.email || "",
        password: "********",
    });

    const showConfirmDialog = (key: string) => {
        return Alert.alert("Are you sure?", `Are you sure you want to permanetly change your ${key}?`, [
            {
                text: "Cancel",
                // onPress: () => setFormState({ ...formState, [ key ]: sessionUser?.[key] || "" }),
                // onPress: () => setConfirmChange(false), // dont need since its already false
                style: "cancel",
                onPress: () => handleCancelClick(key),
            },
            // TODO show loading spinner inbeterrn confirming and updating
            { text: "OK", onPress: () => handleConfirmChange(key), },
        ]);
    };

    function handleCancelClick(key: string) {
        switch (key) {
            case 'email':
                setFormState({ ...formState, email: sessionUser?.email || "" });
                break;
            case 'password':
                setFormState({ ...formState, password: "********" });
                break;
            case 'display name':
                setFormState({ ...formState, displayName: sessionUser?.display_name || sessionUser?.email || "" });
                break;
        };
    };



    function handleConfirmChange(key: string) {
        switch (key) {
            case 'email':
                changeEmail(formState.email).then((user) => {
                    if (user) alert("Email updated!")
                    else alert("Error updating  email.");
                });
                break;
            case 'password':
                changePassword(formState.password).then((user) => {
                    if (user) alert("Password updated!")
                    else alert("Error updating password.");
                });
                break;
            case 'display name':
                changeDisplayName(formState.displayName).then((user) => {
                    if (user) alert("Display name updated!")
                    else alert("Error updating display name.");
                });
                break;
        };
    };

    // const handleSave = useCallback(async (key: string) => {






    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled style={{ flex: 1 }} >
            <Layout backgroundColor="#2E3944" >
                <ScrollView contentContainerStyle={{ flexGrow: 1, }} >
                    <View style={{ flex: 3, paddingHorizontal: 20, paddingBottom: 30 }}>
                        <Button color="#3d4b59" text='Logout' size="md" style={{ marginBottom: 20 }} textStyle={{ color: 'white' }}
                            leftContent={<MaterialCommunityIcons name="logout" size={24} color="white" />}
                            onPress={async () => {
                                //? confirm here?
                                const { error } = await supabase.auth.signOut();
                                if (!error) alert("Signed out!");
                                if (error) alert(error.message);
                            }}
                        />
                        <Text style={styles.formLabel}>Display Name</Text>
                        <TextInput placeholder="Enter your display name" {...textInputProps}
                            value={formState.displayName}
                            onChangeText={(text) => setFormState({ ...formState, displayName: text })}
                        // onChangeText={(text) => changeConfig('display_name', text)}
                        />
                        <Text size="sm" italic={true} style={{ color: '#cb9de2', marginTop: 5 }}>How your name appears in the global feed.</Text>
                        <Button
                            {...saveButtonProps}
                            text='Save Display Name' key="display"
                            onPress={() => showConfirmDialog('display name')}
                        />

                        <Text style={{ marginTop: 15, ...styles.formLabel }}>Email</Text>
                        <TextInput placeholder="Enter your Email" keyboardType="email-address"
                            {...textInputProps}
                            value={formState.email}
                            onChangeText={(text) => setFormState({ ...formState, email: text })}
                        />
                        <Text size="sm" italic={true} style={{ color: '#cb9de2', marginTop: 5 }}>Requires email confirmation.</Text>
                        <Button
                            {...saveButtonProps}
                            text='Save Email' key="email"
                            onPress={() => showConfirmDialog('email')}
                        />
                        <Text style={{ marginTop: 15, ...styles.formLabel }}>Password</Text>
                        <TextInput secureTextEntry={true} placeholder="********"
                            {...textInputProps}
                            value={formState.password}
                            onChangeText={(text) => setFormState({ ...formState, password: text })}
                        />
                        <Button
                            {...saveButtonProps}
                            text='Save Password' key="password"
                            onPress={() => showConfirmDialog('password')}
                        />
                    </View>
                </ScrollView>
            </Layout>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 10,
        marginRight: 25,
        marginLeft: 25,
    },
    textInput: {
        color: "#cb9de2",
        backgroundColor: "#4E1E66",
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 15,
        borderColor: '#cb9de2',
        borderWidth: 1,
    },
    formLabel: { color: '#a8e4a0', },
    saveButton: {
        marginTop: 20,
        alignSelf: 'flex-end',
    }
});

const textInputProps: TextInputProps | Readonly<TextInputProps> = {
    autoCapitalize: "none",
    autoComplete: "off",
    autoCorrect: false,
    style: styles.textInput,
    selectionColor: '#cb9de2',
    placeholderTextColor: '#cb9de2',
};

const saveButtonProps: any = {
    color: '#a8e4a0',
    size: "sm",
    textStyle: { color: '#2E3944' },
    style: styles.saveButton,
    leftContent: <MaterialCommunityIcons name="content-save-check-outline" size={25} color="#2E3944" />,
};