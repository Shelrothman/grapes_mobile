import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform, ScrollView, Button, Text, View, SafeAreaView } from "react-native";
import { HomeFormWrapper } from "../../utils/HomeFormWrapper";
import { useHeaderHeight } from '@react-navigation/elements';
import Loading from "../../utils/Loading";
import { useAuthContext } from "../../contexts/AuthProvider";
import { HomeService } from "../../services/HomeService";
import { my_styles } from "../../styles/my";
import { Grape, GrapeDayLetter, Home_Grape } from "../../types";
import { resToHomeGrape } from "../../utils";
import { GrapeIcons } from "../../utils/Icons";
import { defaultGrape } from "../../utils/constants";






// TODO use "refreshControl" prop for refreshing in global dood. for <ScrollView>

// this bout to temp be all the bottomEditor and stuff combin and myGraoe and all combined

export default function HomeComponent() {


    const height = useHeaderHeight();


    const { sessionUser } = useAuthContext();
    // const [ selectedLetter, setSelectedLetter ] = useState<GrapeDayLetter | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ isError, setIsError ] = useState<boolean>(false);

    // const [ grape, setGrape ] = useState<Home_Grape | null>(null);
    const [ grapeFormState, setGrapeFormState ] = useState<Home_Grape | null>(null);
    // * memoize the fetchData function so that it only runs when the sessionUser changes or when the screen is re-focused
    useFocusEffect(
        React.useCallback(() => {
            fetchData().then(() => setIsLoading(false));
            // return () => {
            //     setSelectedLetter(null);
            // };
            return () => setIsLoading(true);
        }, [ sessionUser ])
    );
    async function fetchData() {
        try {
            if (sessionUser == null || sessionUser == undefined) return;
            // if (grapeFormState === defaultGrape) return; // ? do we need this?
            //* bc it should change if we change a letter so..
            const response = await HomeService.getOrCreateToday(sessionUser!.user_uid);
            if (response !== null) setGrapeFormState(resToHomeGrape(response));
            // else setIsError(true); //? do we need this?
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching data:', error);
            setIsError(true);
        }
    }

    // const handleSaveLetter = () => {
    //     // setGrapeFormState(formState);
    //     console.log("handleSaveLetter");
    // };

    // TODo modulate and make more dynamic

    // !! PU here!! I got th UX-logic done. now i need to hook back up api and stuff


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#2E3944" }}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled
                style={{ flex: 1, }} keyboardVerticalOffset={height}

            >
                <Text style={my_styles.date_title}> Today: {new Date().toDateString()} </Text>
                {isLoading ? <Loading /> : isError ? (<View style={my_styles.main_container}>
                    <Text style={my_styles.date_title}>Internal Server Error</Text>
                    <Text style={my_styles.date_title}>Please try again later</Text>
                </View>) : grapeFormState && (
                    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: "#2E3944", paddingBottom: 40, }}
                        keyboardShouldPersistTaps='handled' //! this is the KEY to allow the button INSIDE the textInput to function WITHOUT dismissing the keyboard
                    >
                        <HomeFormWrapper
                            label="G" key="g"
                            setFormState={setGrapeFormState} formState={grapeFormState}
                        />
                        <HomeFormWrapper
                            label="R" key="r"
                            setFormState={setGrapeFormState} formState={grapeFormState}
                        />
                        <HomeFormWrapper
                            label="A" key="a"
                            setFormState={setGrapeFormState} formState={grapeFormState}
                        />
                        <HomeFormWrapper
                            label="P" key="p"
                            setFormState={setGrapeFormState} formState={grapeFormState}
                        />
                        <HomeFormWrapper
                            label="E" key="e"
                            setFormState={setGrapeFormState} formState={grapeFormState}
                        />
                        <HomeFormWrapper
                            label="S" key="s"
                            setFormState={setGrapeFormState} formState={grapeFormState}
                        />
                    </ScrollView>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
}
