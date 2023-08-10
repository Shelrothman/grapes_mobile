import { useState } from "react";
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Button, Platform, Text, TextInput, Linking } from "react-native";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AccountService } from "../../services/AccountService";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GrapesUser } from "../../types";

// TODO: make it more secure by when link to go there is clicked... send a jwt token to the user_name table applied to their row.. and it expires in 5 minutes or something... and then its another way to verify and if its not there anymore.. send message link go get a new link.. for secrity purposes bblalala this way only the can reset their password and not someonw else? someone who just knows the url..

// interface GrapeError extends PostgrestError {
//     message: string;
// }
const default_error: string = "Something went wrong completing your request. Please try again. If this problem persists, please contact support: shel.programmer@gmail.com";


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
                    await Linking.openURL(`${support_url}${user_id.id}`);
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
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#2E3944", }} >
                </View>
                <View style={{ flex: 3, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: "#2E3944", }}>
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
                    {/* <Text style={{ color: '#cb9de2', marginTop: 5, fontSize: 12, fontStyle: 'italic' }}>psst if you forgot what email you used to sign up. </Text> */}
                    <View style={{ marginTop: 20, borderWidth: 2, borderRadius: 10, padding: 5, backgroundColor: "#a8e4a0", flexDirection: 'row', justifyContent: 'center' }}>
                        <Button title={loading ? "Loading" : "Password Reset"} onPress={() => { forget(); }} color="#2E3944" disabled={loading} />
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
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30, justifyContent: "center", }}>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
