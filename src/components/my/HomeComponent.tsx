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

// !! PU here!! I got th UX-logic done. now i need to hook back up api and stuff


    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled
            style={{ flex: 1, paddingHorizontal: 20 }} keyboardVerticalOffset={height + 200}
        >
            {loading ? <Loading /> : (
                <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#2E3944", marginTop: 20, paddingBottom: 40 }} >
                    <View style={{ marginBottom: 20, borderColor: '#4E1E66', borderWidth: 2, backgroundColor: "#3d4b59", borderRadius: 10 }}>
                        {/* <Button color="#a8e4a0" title='Logout' onPress={() => showConfirmLogout()} /> */}
                    </View>
                    <HomeFormWrapper
                        label="G" inputValue={formState.g} key="g"
                        setFormState={setFormState} formState={formState}
                        onButtonPress={() => handleSaveLetter()}
                    />
                    <HomeFormWrapper
                        label="R" inputValue={formState.r} key="r"
                        setFormState={setFormState}
                        formState={formState}
                        onButtonPress={() => handleSaveLetter()}
                    />
                    <HomeFormWrapper
                        label="A" inputValue={formState.a} key="a"
                        setFormState={setFormState}
                        formState={formState}
                        onButtonPress={() => handleSaveLetter()} 
                    />
                    <HomeFormWrapper
                        label="P" inputValue={formState.p} key="p"
                        setFormState={setFormState}
                        formState={formState}
                        onButtonPress={() => handleSaveLetter()} 
                    />

                    <HomeFormWrapper
                        label="E" inputValue={formState.e} key="e"
                        setFormState={setFormState}
                        formState={formState}
                        onButtonPress={() => handleSaveLetter()}
                    />

                    <HomeFormWrapper
                        label="S" inputValue={formState.s} key="s"
                        setFormState={setFormState}
                        formState={formState}
                        onButtonPress={() => handleSaveLetter()}
                    />
                </ScrollView>
            )}
        </KeyboardAvoidingView>


    );
}
