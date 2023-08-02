import { useState } from "react";
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Image, Platform, } from "react-native";
import { supabase } from "../../initSupabase";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Layout, Text, TextInput, Button, useTheme, themeColor, } from "react-native-rapi-ui";

export default function ({ navigation, }: NativeStackScreenProps<AuthStackParamList, "ForgetPassword">) {
    const { isDarkmode, setTheme } = useTheme();
    const [ email, setEmail ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);

    async function forget() {
        setLoading(true);
        const { data, error } = await supabase.auth.api.resetPasswordForEmail(email, {
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
            <Layout>
                <ScrollView contentContainerStyle={{ flexGrow: 1, }} >
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: isDarkmode ? "#17171E" : themeColor.white100, }} >
                        <Image resizeMode="contain" style={{ height: 250, width: 250, }} source={require("../../../assets/images/forget.png")} />
                    </View>
                    <View style={{ flex: 3, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: isDarkmode ? themeColor.dark : themeColor.white, }} >
                        <Text size="h3" fontWeight="bold" style={{ alignSelf: "center", padding: 30, }} >
                            Forget Password
                        </Text>
                        <Text>Email</Text>
                        <TextInput
                            containerStyle={{ marginTop: 15 }} placeholder="Enter your email" value={email}
                            autoCapitalize="none" autoComplete="off" autoCorrect={false} keyboardType="email-address"
                            onChangeText={(text) => setEmail(text)}
                        />
                        <Button text={loading ? "Loading" : "Send email"} onPress={() => { forget(); }} style={{ marginTop: 20, }} disabled={loading} />
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15, justifyContent: "center", }}>
                            <Text size="md">Already have an account?</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("Login"); }} >
                                <Text size="md" fontWeight="bold" style={{ marginLeft: 5, }} >
                                    Login here
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30, justifyContent: "center", }}>
                            <TouchableOpacity onPress={() => { isDarkmode ? setTheme("light") : setTheme("dark"); }} >
                                <Text size="md" fontWeight="bold" style={{ marginLeft: 5, }} >
                                    {isDarkmode ? "☀️ light theme" : "🌑 dark theme"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Layout>
        </KeyboardAvoidingView>
    );
}
