import { useState } from "react";
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Image, Platform, Text, TextInput} from "react-native";
import { supabase } from "../../initSupabase";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuthContext } from "../../contexts/AuthProvider";
import { AccountService } from "../../services/AccountService";
import { Button } from 'react-native-rapi-ui';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function ({ navigation, }: NativeStackScreenProps<AuthStackParamList, "Register">) {
    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);

    const { setFirstTimeLogin } = useAuthContext();

    async function register() {
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        const { user } = data;
        if (!error && !user) {
            setLoading(false);
            // NOT requiring email confirmation.. only requiring directing to admin to go through
        }
        if (error) {
            setLoading(false);
            alert(error.message); // alerts if duplicate email
        }
        if (user) {
            const accountService = new AccountService();
            const data = await accountService.setUpNewUser(email, user.id);
            if (!data) { 
                alert("There was an error setting up your account. Please try again later.");
                return navigation.navigate("Login");
            }
            setFirstTimeLogin && setFirstTimeLogin(true);
        }
    }


    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled style={{ flex: 1, backgroundColor: "#1a1e47", }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, marginTop: 40}} >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1a1e47", }}>
                <Image resizeMode="contain" style={{ height: 300, width: 300, }}
                            source={require("../../assets/images/register.png")}
                        />
                </View>
                <View style={{ flex: 3, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: "#1a1e47", }}>
                    <Text style={{ alignSelf: "center", fontFamily: 'Grape-Header-a', color: "white", fontSize: 30, }} >
                        Register
                    </Text>
                    <Text style={{ color: 'white', fontFamily: 'Grape-Header-b' }}>Email</Text>
                    <TextInput style={{ color: 'white', marginTop: 15, borderWidth: 2, borderColor: "#474115", borderRadius: 10, padding: 10, fontFamily: 'Body-Reg',  backgroundColor: '#3d4b59' }}
                        returnKeyType="done" value={email} autoCapitalize="none" placeholder="Enter your email" 
                        autoComplete="off" autoCorrect={false} keyboardType="email-address" onChangeText={(text) => setEmail(text)} placeholderTextColor={'#a8e4a0'}
                    />
                    <Text style={{ marginTop: 15, color: 'white',fontFamily: 'Grape-Header-b' }}>Password</Text>
                    <TextInput style={{ color: 'white', marginTop: 15, borderWidth: 2, borderColor: "#474115", borderRadius: 10, padding: 10, fontFamily: 'Body-Reg',  backgroundColor: '#3d4b59' }}
                        placeholder="Enter your password" value={password} autoCapitalize="none" autoComplete="off" autoCorrect={false}
                        secureTextEntry={true} onChangeText={(text) => setPassword(text)} placeholderTextColor={'#a8e4a0'}
                        returnKeyType="done"
                    />
                    <View style={{ marginTop: 20, padding: 5, flexDirection: 'row', justifyContent: 'center' }}>
                        <Button style={{ borderWidth: 2, borderRadius: 10, borderColor: '#474115', }}
                            leftContent={<Text style={{ fontFamily: 'Grape-Header-b', fontSize: 14, color: 'black'}}>
                                {loading ? "Loading" : "Create an account"}
                            </Text>}
                            onPress={() => { register(); }} color="#a8e4a0" disabled={loading}
                            rightContent={<FontAwesome name="check-square-o" size={25} color="black" />}
                        />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15, justifyContent: "center" }} >
                        <Text style={{ color: 'white', fontFamily: 'Body-Reg' }}>Already have an account?{' '}</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate("Login"); }} style={{ borderWidth: 1, padding: 5, borderRadius: 10, backgroundColor: '#4E1E66' }} >
                            <Text style={{ fontWeight: 'bold', color: 'white', fontFamily: 'Grape-Header-b' }} >
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
