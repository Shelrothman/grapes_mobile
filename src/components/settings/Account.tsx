import React, { useState } from "react";
import { ScrollView, KeyboardAvoidingView, Platform, Alert, View, Linking } from "react-native";
import { useHeaderHeight } from '@react-navigation/elements';
import { supabase } from '../../initSupabase';
import { useAuthContext, AuthUser } from "../../contexts/AuthProvider";
import { AccountService } from "../../services/AccountService";
import Loading from "../../utils/Loading";
import { FormRowWrapper } from "../../utils/FormRowWrapper";
import { FormState } from "../../types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from 'react-native-rapi-ui';

// TODO clean everything up and modulate to a servie like did for home ui

// !! shoot! the problem now is like in the web i canm update and send new doisplay name. but not working from ios...wtf
// * well its bc its responding with a 409
// ! so i need to error handle better for that!
// * but also the 409 is bc of the relation to the shared_letters hollding the username from the other tabkle so it makes a conflict
/*
    "message": "update or delete on table \"user_names\" violates foreign key constraint \"shared_letters_user_name_fkey\" on table \"shared_letters\""
! so i need to use the user_uid instead of the display name in the shared letters table and THEN change the logic for when posting to the shared letters table, it sends the id instead of the display name and then CHANGE the history feed to read from the user_names table instead of the shared letters table to get the displayname property based on that id.
*/

async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (!error) alert("Signed out!");
    if (error) alert(error.message);
};

const support_url = "https://grapes-admin.vercel.app/?emailupdate?id=";


export function Account() {
    const { sessionUser, setSessionUser } = useAuthContext();
    const [ loading, setLoading ] = useState<boolean>(true);
    const height = useHeaderHeight();
    const defaultFormState: FormState = {
        display: sessionUser?.display_name || sessionUser?.email || "",
        email: sessionUser?.email || "",
        password: "********",
    };
    const [ formState, setFormState ] = useState<FormState>(defaultFormState);


    useFocusEffect( // * this runs only when the screen is refocused
        React.useCallback(() => {
            setFormState(defaultFormState);
            setLoading(false);
            return () => {
                setFormState(defaultFormState);
                setLoading(true);
            };
        }, [ sessionUser ])
    );


    const showConfirmDialog = (key: string) => Alert.alert("Are you sure?",
        `Are you sure you want to permanently change your ${key === 'display' ? 'display name' : key}?`, [
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


    function handleCancelClick(key: string) {
        if (key === 'email') return setFormState({ ...formState, email: sessionUser!.email });
        if (key === 'password') return setFormState({ ...formState, password: "********" });
        if (key === 'display') return setFormState({ ...formState, display: sessionUser!.display_name });
    };


    async function handleConfirmChange(key: string) {
        const displayKey: string = key === 'display' ? 'display name' : key;
        if (formState[ key ] && formState[ key ]!.length < 6) return alert(`${displayKey} must be at least 6 characters.`);
        try {
            const accountService = new AccountService();
            const user = await accountService.changeConfig(formState[ key ], key);
            if (user) {
                const userString: string = JSON.stringify(user);
                const _user = JSON.parse(userString);
                if ((_user.message && _user.message.includes('unique constraint')) && key === 'display') {
                    handleCancelClick(key); // reset the value back
                    return alert(`Display Name already exists, please choose another.`);
                }
                if (key === 'email') setSessionUser!({ ...sessionUser, email: formState.email } as AuthUser);
                if (key === 'display') setSessionUser!({ ...sessionUser, display_name: formState.display } as AuthUser);
                return alert(`${displayKey} updated!`);
            } else if (user == null) {
                handleCancelClick(key);
                return alert(`Error updating ${displayKey}.`);
            }
        } catch (error: any) {
            alert(`Error updating ${displayKey}: ${error.message}`);
            return handleCancelClick(key);
        }
    };

    const confirmEmailChange = () => Alert.alert("Are you sure?",
        "This will direct you to an external webpage to enter your new email value. Your current session will be logged out.", [
        { text: "Cancel", style: "cancel", onPress: () => handleCancelClick('email') },
        { text: "Take me there", onPress: async () => await handleEmailChange() },
    ]);

    const handleEmailChange = async () => {
        setLoading(true);
        if (sessionUser && sessionUser.user_uid) {
            await Linking.openURL(support_url + sessionUser.user_uid);
            // then log them out so they can verify their new email
            setLoading(false);
            await handleLogout();
        }
        return setLoading(false);
    };



    return (
        <SafeAreaView style={{ flex: 1, }}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled
                style={{ flex: 1 }} keyboardVerticalOffset={height + 100}
            >
                {loading ? <Loading /> : (
                    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#1a1e47", paddingBottom: 40, }}
                        keyboardShouldPersistTaps='handled'
                    >
                        <View style={{ marginBottom: 20, borderColor: '#a8e4a0', borderWidth: 1, backgroundColor: "#3d4b59", borderRadius: 10, minWidth: '85%', maxWidth: '85%', alignSelf: 'center', }}>
                            <Button
                                color="#3d4b59"
                                textStyle={{ color: '#a8e4a0', fontFamily: 'Body-Reg', fontSize: 16, }}
                                text='Logout' onPress={() => showConfirmLogout()} />
                        </View>
                        <FormRowWrapper label="Display Name" inputValue={formState.display}
                            onChangeText={(text) => setFormState({ ...formState, display: text })}
                            onButtonPress={() => showConfirmDialog('display')}
                            key="display"
                            btnText="Save Display Name"
                            initialValue={sessionUser?.display_name || ""}
                        />
                        <FormRowWrapper label="Email" inputValue={formState.email}
                            onChangeText={(text) => setFormState({ ...formState, email: text })}
                            onButtonPress={() => confirmEmailChange()}
                            key="email" btnText="Change Email"
                            initialValue={sessionUser?.email || ""}
                        />
                        <FormRowWrapper label="New Password" inputValue={formState.password}
                            initialValue={defaultFormState.password}
                            onChangeText={(text) => setFormState({ ...formState, password: text })}
                            onButtonPress={() => showConfirmDialog('password')} key="password" btnText="Change Password"
                        />
                    </ScrollView>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
