import { ScrollView, View, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TextInputProps } from "react-native";
import { supabase } from '../../initSupabase';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Layout, Text, Button, useTheme, themeColor, } from "react-native-rapi-ui";
// i think text from rapi-ui auto word wraps

//* Display name defaults to their email and then they have optuon in here to customize it

// TODO fix the excess top margin above the logout button and also figure out why it does do the avoiding view thing for the Password input



// TODO lots of modularization
export function Account() {

    const textInputProps: TextInputProps | Readonly<TextInputProps> = {
        autoCapitalize: "none",
        autoComplete: "off",
        autoCorrect: false,
        style: styles.textInput,
        selectionColor: '#cb9de2'
    };


    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled style={{ flex: 1 }} >
            <Layout backgroundColor="#2E3944" >
                <ScrollView contentContainerStyle={{ flexGrow: 1, }} >
                    <View style={{ flex: 3, paddingHorizontal: 20, paddingBottom: 30 }}>
                        <Button status='danger' text='Logout' size="md" style={{ marginBottom: 20, }}
                            leftContent={<MaterialCommunityIcons name="logout" size={24} color="white" />}
                            onPress={async () => {
                                const { error } = await supabase.auth.signOut();
                                if (!error) alert("Signed out!");
                                if (error) alert(error.message);
                            }}
                        />
                        <Text style={styles.formLabel}>Display Name</Text>
                        <TextInput defaultValue="Enter your display name" {...textInputProps}
                            //TODO value, onChangeText,
                        />
                        <Text size="sm" italic={true} style={{ color: '#cb9de2', marginTop: 5 }}>How your name appears in the global feed.</Text>
                        <Text style={{ marginTop: 15, ...styles.formLabel }}>Email</Text>
                        <TextInput defaultValue="Enter your Email" keyboardType="email-address"
                            {...textInputProps}
                            //TODO value, onChangeText,
                        />
                        <Text style={{ marginTop: 15, ...styles.formLabel }}>Password</Text>
                        <TextInput secureTextEntry={true} defaultValue="********" {...textInputProps}
                            //TODO value, onChangeText, onChangeText={(text) => setPassword(text)}
                        />
                        <Text style={{ color: '#cb9de2' }}>{'\n'}More settings coming soon...</Text>
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
});