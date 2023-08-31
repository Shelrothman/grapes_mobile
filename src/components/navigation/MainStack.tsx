import { useState } from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";
import { useAuthContext } from "../../contexts/AuthProvider";
import { nav_styles } from "../../styles/nav";
import { About } from "../settings/About";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// import { useCallback } from 'react';
// import { useFonts } from 'expo-font';
// // import * as SplashScreen from 'expo-splash-screen';
// // SplashScreen.preventAutoHideAsync();


const MainStack = createNativeStackNavigator();

const Main = () => {
    const [ modalVisible, setModalVisible ] = useState<boolean>(true);
    const { firstTimeLogin, setFirstTimeLogin } = useAuthContext();

    if (firstTimeLogin === true && modalVisible === true) {
        return (
            <View style={nav_styles.centeredView}>
                <Modal animationType="slide" transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false)
                        setFirstTimeLogin && setFirstTimeLogin(false);
                    }}
                >
                    <View style={nav_styles.centeredView}>
                        <View style={nav_styles.modalView}>
                            <View style={nav_styles.modalHeader}>
                                <Text style={nav_styles.welcomeText}>Welcome to G.R.A.P.E.S!</Text>
                                <Pressable onPress={() => setModalVisible(false)} style={nav_styles.x_pressable}>
                                    <Text style={{ fontFamily: 'Reg-Italic' }}>X</Text>
                                </Pressable>
                            </View>
                            <About />
                            <Text style={nav_styles.helpText}>
                                You can review this info any time in the <Text style={{ fontFamily: 'Grape-Header-b' }}>About</Text> section.
                                <MaterialCommunityIcons name='fruit-grapes-outline' size={20} color="#1a1e47" />
                            </Text>
                        </View>
                    </View>

                </Modal>
            </View>
        );
    }

    return (
        <MainStack.Navigator screenOptions={{ headerShown: false }} >
            <MainStack.Screen name="MainTabs" component={MainTabs} />
            {/* // * aka.. "Layout" */}
        </MainStack.Navigator>
    );
};

export default Main;
