import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Button, Text, TextInput, View } from "react-native";
import { HomeFormWrapper } from "../../utils/HomeFormWrapper";
import { useHeaderHeight } from '@react-navigation/elements';
import { Home_Grape } from "../../types";
import Loading from "../../utils/Loading";

type HomeComponentProps = {
    grape: Home_Grape;
    setGrape: (grape: Home_Grape) => void;
    loading: boolean;
};


// this bout to temp be all the bottomEditor and stuff combin and myGraoe and all combined

export function HomeComponent({ grape, setGrape, loading }: HomeComponentProps) {

    const [ formState, setFormState ] = useState<Home_Grape>(grape);

    const height = useHeaderHeight();

    const handleSaveLetter = () => {
        // setGrape(formState);
        console.log("handleSaveLetter");
    };

    // TODo modulate and make more dynamic

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled
            style={{ flex: 1, paddingHorizontal: 20 }} keyboardVerticalOffset={height + 200}
        >
            {loading ? <Loading /> : (
                <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#2E3944", marginTop: 20, paddingBottom: 40 }} >
                    <View style={{ marginBottom: 20, borderColor: '#4E1E66', borderWidth: 2, backgroundColor: "#3d4b59", borderRadius: 10 }}>
                        {/* <Button color="#a8e4a0" title='Logout' onPress={() => showConfirmLogout()} /> */}
                    </View>
                    <HomeFormWrapper onEnter={() => setFormState({
                        ...formState,
                        g: "",
                    })} label="G" inputValue={formState.g}
                        onChangeText={(text) => setFormState({ ...formState, g: text })}
                        // onButtonPress={() => showConfirmDialog('display')} 
                        onButtonPress={() => handleSaveLetter()}
                        key="g"
                    />
                    <HomeFormWrapper onEnter={() => setFormState({
                        ...formState,
                        r: "",
                    })} label="R" inputValue={formState.r}
                        onChangeText={(text) => setFormState({ ...formState, r: text })}
                        onButtonPress={() => handleSaveLetter()}
                        key="r"
                    // btnText="Change Email"
                    />
                    <HomeFormWrapper onEnter={() => setFormState({
                        ...formState,
                        a: "",
                    })} label="A" inputValue={formState.a}
                        onChangeText={(text) => setFormState({ ...formState, a: text })}
                        onButtonPress={() => handleSaveLetter()} key="a"
                    />

                    <HomeFormWrapper onEnter={() => setFormState({
                        ...formState,
                        p: ""
                    })} label="P" inputValue={formState.p}
                        onChangeText={(text) => setFormState({ ...formState, p: text })}
                        onButtonPress={() => handleSaveLetter()} key="p"
                    />

                    <HomeFormWrapper onEnter={() => setFormState({
                        ...formState,
                        e: ""
                    })} label="E" inputValue={formState.e}
                        onChangeText={(text) => setFormState({ ...formState, e: text })}
                        onButtonPress={() => handleSaveLetter()} key="e"
                    />

                    <HomeFormWrapper onEnter={() => setFormState({
                        ...formState,
                        s: ""
                    })} label="S" inputValue={formState.s}
                        onChangeText={(text) => setFormState({ ...formState, s: text })}
                        onButtonPress={() => handleSaveLetter()} key="s"
                    />
                </ScrollView>
            )}
        </KeyboardAvoidingView>


    );
}
