import { useState } from "react";
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Button, Platform, Text, TextInput, Linking } from "react-native";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AccountService } from "../../services/AccountService";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GrapesUser } from "../../types";
import { default_error } from "../../utils/constants";

// switch out during development
// const support_url = "http://localhost:5173/?resetpassword?id="
const support_url = "https://grapes-admin.vercel.app/?resetpassword?id="

export default function ({ navigation, }: NativeStackScreenProps<AuthStackParamList, "ForgetPassword">) {
    const [ email, setEmail ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);
    async function forget() {
        try {
            if (email.length < 1) return alert("Please enter your email address first.");
            setLoading(true);
            const grapesUser = await AccountService.getUserByEmail(email);
            if (!grapesUser || grapesUser == null) {
                return alert("No user found with that email address. Please try again.");
            }
            if (grapesUser) {
                const user_id = grapesUser as GrapesUser & { id: string };
                if (user_id.id) {
                    // await Linking.openURL(`${support_url}${user_id.id}`);
                    await Linking.openURL(support_url + user_id.id);
                    setLoading(false);
                    return navigation.navigate("Login");
                } else {
                    return alert(default_error);
                }
            } else {
                return alert(default_error);
            }
        } catch (error) {
            setLoading(false);
            return alert(default_error);
        }


    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, }} >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1a1e47", }} >
                </View>
                <View style={{ flex: 3, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: "#1a1e47", }}>
                    <Text style={{ alignSelf: "center", paddingVertical: 30, fontWeight: "bold", color: "#8031A7", fontSize: 30, }} >
                        Forgot your Password?
                    </Text>
                    <Text style={{ fontWeight: 'bold', color: 'white' }} >No Problem. Enter your email below:</Text>
                    <TextInput
                        style={{ color: 'white', marginTop: 15, borderWidth: 2, borderColor: "#8031A7", borderRadius: 10, padding: 10 }}
                        placeholder="Enter your email"
                        value={email} autoCapitalize="none" autoComplete="off" autoCorrect={false}
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                    />
                    <View style={{ marginTop: 20, borderWidth: 2, borderRadius: 10, padding: 5, backgroundColor: "#a8e4a0", flexDirection: 'row', justifyContent: 'center' }}>
                        <Button title={loading ? "Loading" : "Password Reset"} onPress={() => { forget(); }} color="#1a1e47" disabled={loading} />
                        <MaterialCommunityIcons name="open-in-new" size={25} color="black" />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15, justifyContent: "center", }}>
                        <Text style={{ color: 'white' }}>Remember it?{' '}</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("Login"); }} style={{ borderWidth: 1, padding: 5, borderRadius: 10, backgroundColor: '#8031A7' }}>
                            <Text style={{ fontWeight: 'bold', color: 'white' }} >
                                Login here
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
