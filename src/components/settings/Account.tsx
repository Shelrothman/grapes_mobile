import { useState } from "react";
import { ScrollView, View, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TextInputProps } from "react-native";
import { supabase } from '../../initSupabase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Layout, Text, Button, useTheme, themeColor, } from "react-native-rapi-ui";
// i think text from rapi-ui auto word wraps

import { useAuthContext } from "../../contexts/AuthProvider";



//* Display name defaults to their email and then they have optuon in here to customize it

// TODO fix the excess top margin above the logout button and also figure out why it does NOT do the avoiding view thing for the Password input.. It works for the login.tsx so use that to see

// !!!!!!!!!!!!!!!!!!!!!!!!!
// ! PU here and get the user data from the database or however and display it here!
//*  maybe use a method in the provider to get the user data and then pass it down to here

// TODO confirmation messages

// TODO lots of modularization
export function Account() {
    const { sessionUser, changeEmail, changePassword, changeDisplayName } = useAuthContext();
    console.log("sessionUser: ", sessionUser);

    const [ formState, setFormState ] = useState({
        displayName: sessionUser?.display_name || sessionUser?.email,
        email: sessionUser?.email,
        // password: "",
        // password: "",
    });


    // ! PU HERere and get the cruding.....

    const textInputProps: TextInputProps | Readonly<TextInputProps> = {
        autoCapitalize: "none",
        autoComplete: "off",
        autoCorrect: false,
        style: styles.textInput,
        selectionColor: '#cb9de2',
        placeholderTextColor: '#cb9de2',
    };


    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled style={{ flex: 1 }} >
            <Layout backgroundColor="#2E3944" >
                <ScrollView contentContainerStyle={{ flexGrow: 1, }} >
                    <View style={{ flex: 3, paddingHorizontal: 20, paddingBottom: 30 }}>
                        <Button
                            color="#3d4b59"
                            text='Logout' size="md" style={{ marginBottom: 20}} 
                            textStyle={{ color: 'white' }}
                            leftContent={<MaterialCommunityIcons name="logout" size={24} color="white" />}
                            onPress={async () => {
                                // const confirm = window.confirm("Are you sure you want to sign out?");
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
                            color='#a8e4a0'
                            text='Save Display Name' size="sm" 
                            textStyle={{ color: '#2E3944' }}
                            style={styles.saveButton}
                            leftContent={<MaterialCommunityIcons name="content-save-check-outline" size={25} color="#2E3944" />}
                            onPress={() => console.log('save')}
                            key="display"
                        />
                        <Text style={{ marginTop: 15, ...styles.formLabel }}>Email</Text>
                        <TextInput placeholder="Enter your Email" keyboardType="email-address"
                            {...textInputProps}
                            value={formState.email}
                        //TODO value, onChangeText,
                        />
                        <Text size="sm" italic={true} style={{ color: '#cb9de2', marginTop: 5 }}>Requires email confirmation.</Text>
                        <Button
                            color='#a8e4a0'
                            text='Save Email' size="sm" 
                            textStyle={{ color: '#2E3944' }}
                            style={styles.saveButton} 
                            leftContent={<MaterialCommunityIcons name="content-save-check-outline" size={25} color="#2E3944" />}
                            onPress={() => console.log('save')}
                            key="email"
                        />
                        <Text style={{ marginTop: 15, ...styles.formLabel }}>Password</Text>
                        <TextInput secureTextEntry={true} defaultValue="********" {...textInputProps}
                        //TODO value, onChangeText, onChangeText={(text) => setPassword(text)}
                        />
                        {/* <Text style={{ color: '#cb9de2' }}>{'\n'}More settings coming soon...</Text> */}
                        <Button
                            color='#a8e4a0'
                            text='Save Password' size="sm" 
                            textStyle={{ color: '#2E3944' }}
                            style={styles.saveButton} 
                            leftContent={<MaterialCommunityIcons name="content-save-check-outline" size={25} color="#2E3944" />}
                            onPress={() => console.log('save')}
                            key="password"
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