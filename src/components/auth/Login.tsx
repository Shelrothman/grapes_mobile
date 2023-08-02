import { useState } from "react";
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Image, Platform, } from "react-native";
import { supabase } from "../../initSupabase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigation";
import { Layout, Text, TextInput, Button, useTheme, themeColor, } from "react-native-rapi-ui";


export default function ({ navigation, }: NativeStackScreenProps<AuthStackParamList, "Login">) {
    const { isDarkmode, setTheme } = useTheme();
    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);


    async function login() {
        setLoading(true);
        const { data: { user }, error, } = await supabase.auth
            .signInWithPassword({ email, password });
        if (!error && !user) {
            setLoading(false);
            alert("Check your email for the login link!");
        }
        if (error) {
            setLoading(false);
            alert(error.message);
        }
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled style={{ flex: 1 }}>
            <Layout>
                <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: isDarkmode ? "#17171E" : themeColor.white100, }} >
                        <Image resizeMode="contain" style={{ height: 275, width: 300 }}
                            source={require("../../../assets/images/login.png")}
                        />
                    </View>
                    <View style={{ flex: 3, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: isDarkmode ? themeColor.dark : themeColor.white, }}>
                        <Text fontWeight="bold" size="h3" style={{ alignSelf: "center", padding: 30, }} >
                            Login
                        </Text>
                        <Text>Email</Text>
                        <TextInput containerStyle={{ marginTop: 15 }} placeholder="Enter your email"
                            value={email} autoCapitalize="none" autoComplete="off" autoCorrect={false}
                            keyboardType="email-address" onChangeText={(text) => setEmail(text)}
                        />
                        <Text style={{ marginTop: 15 }}>Password</Text>
                        <TextInput containerStyle={{ marginTop: 15 }} placeholder="Enter your password"
                            value={password} autoCapitalize="none" autoComplete="off" autoCorrect={false}
                            secureTextEntry={true} onChangeText={(text) => setPassword(text)}
                        />
                        <Button text={loading ? "Loading" : "Continue"} onPress={() => { login(); }}
                            style={{ marginTop: 20, }} disabled={loading}
                        />
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15, justifyContent: "center", }} >
                            <Text size="md">Don't have an account?</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("Register"); }} >
                                <Text size="md" fontWeight="bold" style={{ marginLeft: 5, }}>Register here</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, justifyContent: "center", }} >
                            <TouchableOpacity onPress={() => { navigation.navigate("ForgetPassword"); }} >
                                <Text size="md" fontWeight="bold">Forget password</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30, justifyContent: "center", }}>
                            <TouchableOpacity onPress={() => { isDarkmode ? setTheme("light") : setTheme("dark"); }}>
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
