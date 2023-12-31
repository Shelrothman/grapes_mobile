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


export default function HomeComponent() {
    const height = useHeaderHeight();
    const { sessionUser } = useAuthContext();
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ grapeFormState, setGrapeFormState ] = useState<Home_Grape | null>(null);
    /** state to hold the initial state of the grapeData on load So That we can compare the values before posting erroneously */
    const [initialState, setInitialState] = useState<Home_Grape | null>(null);

    /** memoize the fetchData function so that it only runs when the sessionUser changes or when the screen is re-focused */
    useFocusEffect(
        React.useCallback(() => {
            fetchData().finally(() => setIsLoading(false));
        }, [ sessionUser ])
    );

    async function fetchData() {
        if (sessionUser == null || sessionUser == undefined) return;
        await HomePageService.fetchOrSetDataOnFocus( sessionUser!.user_uid, setGrapeFormState, setInitialState);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#1a1e47" }}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} enabled
                style={{ flex: 1, }} keyboardVerticalOffset={height}
            >
                <Text style={my_styles.date_title}> Today: {getLocalDateForTitle()} </Text>
                {isLoading && <Loading />}
                {grapeFormState && (
                    <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow: 1, backgroundColor: "#1a1e47", paddingBottom: 40, }}>
                        {[ 'G', 'R', 'A', 'P', 'E', 'S' ].map((letter, index) => (
                            <HomeFormWrapper
                                label={letter} key={index} initialState={initialState}
                                setFormState={setGrapeFormState} formState={grapeFormState}
                            />
                        ))}
                    </ScrollView>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
}
