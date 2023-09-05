import { useState } from "react";
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Platform, Text, TextInput, Linking, Image } from "react-native";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AccountService } from "../../services/AccountService";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GrapesUser } from "../../types";
import { default_error } from "../../utils/constants";
import { Button } from 'react-native-rapi-ui';

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
                setLoading(false);
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
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled style={{ flex: 1, backgroundColor: "#1a1e47", }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 40 }} >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1a1e47", }} >
                    <Image resizeMode="contain" style={{ height: 250, width: 250, }} source={require("../../assets/images/forget.png")} />
                </View>
                <View style={{ flex: 3, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: "#1a1e47", }}>
                    <Text style={{ alignSelf: "center", fontFamily: 'Grape-Header-a', color: "white", fontSize: 30, paddingBottom: 20 }} >
                        Forgot your Password?
                    </Text>
                    <Text style={{ fontWeight: 'bold', color: 'white', fontFamily: 'Grape-Header-b' }} >No Problem. Enter your email below:</Text>
                    <TextInput
                        style={{ color: 'white', marginTop: 15, borderWidth: 2, borderColor: "#474115", borderRadius: 10, padding: 10, fontFamily: 'Body-Reg',  backgroundColor: '#3d4b59' }}
                        placeholder="Enter your email"
                        placeholderTextColor={'#a8e4a0'}
                        value={email} autoCapitalize="none" autoComplete="off" autoCorrect={false}
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                        returnKeyType="done"
                    />
                    <View style={{ marginTop: 20, padding: 5, flexDirection: 'row', justifyContent: 'center' }}>
                        <Button style={{ borderWidth: 2, borderRadius: 10, borderColor: '#474115', }}
                            leftContent={<Text style={{ fontFamily: 'Grape-Header-b', fontSize: 14, color: 'black' }}>
                                {loading ? "Loading" : "Password Reset"}
                            </Text>}
                            onPress={() => { forget(); }} color="#a8e4a0" disabled={loading}
                            rightContent={<MaterialCommunityIcons name="open-in-new" size={25} color="black" />}

                        />

                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15, justifyContent: "center", }}>
                        <Text style={{ color: 'white', fontFamily: 'Body-Reg' }}>Remember it?{' '}</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("Login"); }} style={{ borderWidth: 1, padding: 5, borderRadius: 10, backgroundColor: '#4E1E66', borderColor: '#474115', }}>
                            <Text style={{ fontWeight: 'bold', color: 'white', fontFamily: 'Grape-Header-b'  }} >
                                Login here
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
