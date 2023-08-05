import { useState } from "react";
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Image, Platform, Text, TextInput, Button } from "react-native";
import { supabase } from "../../initSupabase";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


export default function ({ navigation, }: NativeStackScreenProps<AuthStackParamList, "ForgetPassword">) {
    const [ email, setEmail ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);

    async function forget() {
        setLoading(true);
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "https://grapes-admin.vercel.app",
        });
        if (!error) {
            setLoading(false);
            alert("Check your email to reset your password!");
        }
        if (error) {
            setLoading(false);
            alert(error.message);
            return;
        }
        return navigation.navigate("Login");
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, }} >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#17171E" }} >
                    <Image resizeMode="contain" style={{ height: 250, width: 250, }} source={require("../../../assets/images/forget.png")} />
                </View>
                <View style={{ flex: 3, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: "#2E3944" }} >
                    <Text style={{ alignSelf: "center", padding: 30, fontWeight: 'bold', fontSize: 30 }} >
                        Forget Password
                    </Text>
                    <Text>Email</Text>
                    <TextInput
                        style={{ marginTop: 15 }} placeholder="Enter your email" value={email}
                        autoCapitalize="none" autoComplete="off" autoCorrect={false} keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                    />
                    <View style={{ marginTop: 20 }} >
                        <Button title={loading ? "Loading" : "Send email"} onPress={() => { forget(); }} disabled={loading} />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15, justifyContent: "center", }}>
                        <Text >Already have an account?</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("Login"); }} >
                            <Text style={{ marginLeft: 5, fontWeight: 'bold' }} >
                                Login here
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30, justifyContent: "center", }}>
                        {/* <TouchableOpacity onPress={() => { isDarkmode ? setTheme("light") : setTheme("dark"); }} >
                                <Text  fontWeight="bold" style={{ marginLeft: 5, }} >
                                    {isDarkmode ? "☀️ light theme" : "🌑 dark theme"}
                                </Text>
                            </TouchableOpacity> */}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
