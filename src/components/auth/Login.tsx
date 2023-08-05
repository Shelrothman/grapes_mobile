import { useState } from "react";
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Image, Platform, Text, TextInput, Button } from "react-native";
import { supabase } from "../../initSupabase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigation";


export default function ({ navigation, }: NativeStackScreenProps<AuthStackParamList, "Login">) {
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
            <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#2E3944", }} >
                </View>
                <View style={{ flex: 3, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: "#2E3944", }}>
                    <Text style={{ alignSelf: "center", paddingVertical: 30, fontWeight: "bold", color: "#8031A7", fontSize: 30, }} >
                        Grapes App Login
                    </Text>
                    <Text style={{ color: 'white' }}>Email</Text>
                    <TextInput
                        style={{ color: 'white', marginTop: 15, borderWidth: 2, borderColor: "#8031A7", borderRadius: 10, padding: 10 }}
                        placeholder="Enter your email"
                        value={email} autoCapitalize="none" autoComplete="off" autoCorrect={false}
                        keyboardType="email-address" onChangeText={(text) => setEmail(text)}
                    />
                    <Text style={{ marginTop: 15, color: 'white', }}>Password</Text>
                    <TextInput style={{ color: 'white', marginTop: 15, borderWidth: 2, borderColor: "#8031A7", borderRadius: 10, padding: 10 }}
                        placeholder="Enter your password"
                        value={password} autoCapitalize="none" autoComplete="off" autoCorrect={false}
                        secureTextEntry={true} onChangeText={(text) => setPassword(text)}
                    />
                    <View style={{ marginTop: 20, borderWidth: 2, borderRadius: 10, padding: 5, backgroundColor: "#a8e4a0" }}>
                        <Button title={loading ? "Loading" : "Continue"} onPress={() => { login(); }}
                            color="#3d4b59"
                            disabled={loading}
                        />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15, justifyContent: "center" }} >
                        <Text style={{ color: 'white' }}>Don't have an account?{' '}</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("Register"); }} style={{ borderWidth: 1, padding: 5, borderRadius: 10, backgroundColor: '#8031A7' }} >
                            <Text style={{ fontWeight: 'bold', color: 'white' }}>Register here</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30, justifyContent: "center", }}>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
