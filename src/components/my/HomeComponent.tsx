import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View, SafeAreaView } from "react-native";
import { HomeFormWrapper } from "../../utils/HomeFormWrapper";
import { useHeaderHeight } from '@react-navigation/elements';
import Loading from "../../utils/Loading";
import { useAuthContext } from "../../contexts/AuthProvider";
import { my_styles } from "../../styles/my";
import { Home_Grape } from "../../types";
import { HomePageService } from "../../services/ui";
import { getLocalDateForTitle } from "../../utils";

// todo: make sure i double checkd there even a change before posting to db (like if they tap in but no change)
// * aka... need a state to then compare...

export default function HomeComponent() {
    const height = useHeaderHeight();
    const { sessionUser } = useAuthContext();
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    // const [ isError, setIsError ] = useState<boolean>(false);
    const [ grapeFormState, setGrapeFormState ] = useState<Home_Grape | null>(null);

    // PICKUP: grapeDataOnLoad setGrapeDataOnLoad.// to use for comparing to not send it erroneously

    /** memoize the fetchData function so that it only runs when the sessionUser changes or when the screen is re-focused */
    useFocusEffect(
        React.useCallback(() => {
            fetchData().finally(() => setIsLoading(false));
        }, [ sessionUser ])
    );

    async function fetchData() {
        if (sessionUser == null || sessionUser == undefined) return;
        await HomePageService.fetchDataOnFocus(
            sessionUser!.user_uid,
            setGrapeFormState,
            // setIsError
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1a1e47" }}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled
                style={{ flex: 1, }} keyboardVerticalOffset={height}
            >
                <Text style={my_styles.date_title}> Today: {getLocalDateForTitle()} </Text>
                {grapeFormState && (
                    <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1, backgroundColor: "#1a1e47", paddingBottom: 40, }}>
                        {[ 'G', 'R', 'A', 'P', 'E', 'S' ].map((letter, index) => (
                            <HomeFormWrapper
                                label={letter} key={index}
                                setFormState={setGrapeFormState} formState={grapeFormState}
                            />
                        ))}
                    </ScrollView>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
}
