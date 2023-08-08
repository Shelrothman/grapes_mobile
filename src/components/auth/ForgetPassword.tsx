import { useState } from "react";
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Button, Platform, Text, TextInput, Linking } from "react-native";
import { supabase } from "../../initSupabase";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { A } from '@expo/html-elements';
// import { Linking } from "expo";

// const support_url = "https://grapes-admin.vercel.app"
// ! change before production
const support_url = "http://localhost:5173"

export default function ({ navigation, }: NativeStackScreenProps<AuthStackParamList, "ForgetPassword">) {
    const [ email, setEmail ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);

    async function forget() {
        setLoading(true);
        const user_id = (await supabase.auth.getSession()).data.session?.user?.id;
        await Linking.openURL(`${support_url}/reset-password?email=${user_id}`);
        // how can i send without email? just a token?

        
        
        // const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        //     redirectTo: "https://grapes-admin.vercel.app",
        // });
        // if (!error) {
        //     setLoading(false);
        //     alert("Check your email to reset your password!");
        // }
        // if (error) {
        //     setLoading(false);
        //     alert(error.message);
        //     return;
        // }
        // return navigation.navigate("Login");

    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, }} >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#2E3944", }} >
                </View>
                <View style={{ flex: 3, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: "#2E3944", }}>
                    <Text style={{ alignSelf: "center", paddingVertical: 30, fontWeight: "bold", color: "#8031A7", fontSize: 30, }} >
                        Forget Password
                    </Text>
                    <Text style={{ fontWeight: 'bold', color: 'white' }} >Email</Text>
                    <TextInput
                        style={{ color: 'white', marginTop: 15, borderWidth: 2, borderColor: "#8031A7", borderRadius: 10, padding: 10 }}
                        placeholder="Enter your email"
                        value={email} autoCapitalize="none" autoComplete="off" autoCorrect={false}
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                    />
                    <View style={{ marginTop: 20, borderWidth: 2, borderRadius: 10, padding: 5, backgroundColor: "#a8e4a0" }}>
                        <Button title={loading ? "Loading" : "Send email"} onPress={() => { forget(); }}                             color="#3d4b59" disabled={loading} />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15, justifyContent: "center", }}>
                    <Text style={{ color: 'white' }}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("Login"); }} >
                            <Text style={{ fontWeight: 'bold', color: 'white' }} >
                                Login here
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30, justifyContent: "center", }}>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
