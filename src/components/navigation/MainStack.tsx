import { useState } from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";
import { HomeGrapeProvider } from "../../contexts/HomeGrapeContext";
import { useAuthContext } from "../../contexts/AuthProvider";
import { nav_styles } from "../../styles/nav";
import { About } from "../settings/About";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const MainStack = createNativeStackNavigator();


const Main = () => {
    const [ modalVisible, setModalVisible ] = useState<boolean>(true);
    const { firstTimeLogin, setFirstTimeLogin } = useAuthContext();


    // ! swithch after making
    // if (firstTimeLogin === true && modalVisible === true) {
    if (modalVisible === true) {
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
                                    <Text style={{ fontWeight: 'bold' }}>X</Text>
                                </Pressable>
                            </View>
                            <About />
                            <Text style={nav_styles.helpText}>
                                You can review this info any time in the <Text style={{ fontStyle: 'normal', fontWeight: 'bold' }}>About</Text> section.
                                <MaterialCommunityIcons name='fruit-grapes-outline' size={20} color="#2E3944" />
                            </Text>
                        </View>
                    </View>

                </Modal>
            </View>
        );
    }

    return (
        <HomeGrapeProvider>
            <MainStack.Navigator screenOptions={{ headerShown: false }} >
                <MainStack.Screen name="MainTabs" component={MainTabs} />
            </MainStack.Navigator>
        </HomeGrapeProvider>
    );
};

export default Main;
