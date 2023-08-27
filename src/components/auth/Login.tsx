import { useState } from "react";
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Image, Platform, Text, TextInput } from "react-native";
import { supabase } from "../../initSupabase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigation";
import { Button } from 'react-native-rapi-ui';


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
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled style={{ flex: 1, backgroundColor: "#1a1e47", }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#1a1e47", marginTop: 40,  }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                    <Image resizeMode="contain" style={{ height: 275, width: 300 }}
                        source={require("../../assets/images/login.png")}
                    />
                </View>
                <View style={{ flex: 3, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: "#1a1e47", }}>
                    <Text style={{ alignSelf: "center", fontFamily: 'Grape-Header-a', color: "white", fontSize: 30, textAlign: 'center' }} >
                        Grapes App Login
                    </Text>
                    <Text style={{ color: 'white', fontFamily: 'Grape-Header-b' }}>Email</Text>
                    <TextInput
                        style={{ color: 'white', marginTop: 15, borderWidth: 2, borderColor: "#474115", borderRadius: 10, padding: 10, fontFamily: 'Body-Reg', backgroundColor: '#3d4b59' }}
                        placeholder="Enter your email"
                        value={email} autoCapitalize="none" autoComplete="off" autoCorrect={false}
                        keyboardType="email-address" onChangeText={(text) => setEmail(text)}
                        returnKeyType="done" placeholderTextColor={'#a8e4a0'}
                    />
                    <Text style={{ marginTop: 15, color: 'white', }}>Password</Text>
                    <TextInput style={{ color: 'white', marginTop: 15, borderWidth: 2, borderColor: "#474115", borderRadius: 10, padding: 10, fontFamily: 'Body-Reg', backgroundColor: '#3d4b59' }}
                        placeholder="Enter your password" returnKeyType="done" placeholderTextColor={'#a8e4a0'}
                        value={password} autoCapitalize="none" autoComplete="off" autoCorrect={false}
                        secureTextEntry={true} onChangeText={(text) => setPassword(text)}
                    />
                    <View style={{ marginTop: 20, padding: 5, flexDirection: 'row', justifyContent: 'center'  }}>
                        {/* // TODO  change this and other buttons in auth flow to use touchopacoity wrapping the texts*/}
                        <Button onPress={() => { login(); }}
                            disabled={loading}
                            color="#a8e4a0" style={{ borderWidth: 2, borderRadius: 10, borderColor: '#474115', minWidth: '85%', maxWidth: '85%' }}
                            leftContent={<Text style={{ fontFamily: 'Grape-Header-b', fontSize: 14, color: 'black'}}>
                            {loading ? "Loading" : "Continue"}
                        </Text>}
                        />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15, justifyContent: "center" }} >
                        <Text style={{ color: 'white', fontFamily: 'Body-Reg' }}>Don't have an account?{' '}</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("Register"); }} style={{ borderWidth: 1, padding: 5, borderRadius: 10, backgroundColor: '#4E1E66' }} >
                            <Text style={{ fontWeight: 'bold', color: 'white', fontFamily: 'Grape-Header-b' }}>Register here</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, justifyContent: "center", }} >
                        <Text style={{ color: 'white', fontFamily: 'Body-Reg' }}>Forgot your password?{' '}</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("ForgetPassword"); }} style={{ borderWidth: 1, padding: 5, borderRadius: 10, backgroundColor: '#4E1E66' }} >
                            <Text style={{ fontWeight: 'bold', color: 'white', fontFamily: 'Grape-Header-b' }}>Reset password</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30, justifyContent: "center", }}>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
