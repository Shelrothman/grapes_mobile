import React, { useState, Fragment } from "react";
import { View, Text, SafeAreaView } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { MyGrape } from "./MyGrape";
import { HomeComponent } from "./HomeComponent";


import { resToHomeGrape } from "../../utils";
import { GrapeIcons } from "../../utils/Icons";
import { Grape, GrapeDayLetter, Home_Grape } from "../../types";
import { my_styles } from "../../styles/my";
import { HomeService } from "../../services/HomeService";
import Loading from "../../utils/Loading";
import { useAuthContext } from "../../contexts/AuthProvider";


export default function Home() {
    const { sessionUser } = useAuthContext();
    const [ selectedLetter, setSelectedLetter ] = useState<GrapeDayLetter | null>(null);
    const [ grape, setGrape ] = useState<Home_Grape | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ isError, setIsError ] = useState<boolean>(false);

    // * memoize the fetchData function so that it only runs when the sessionUser changes or when the screen is re-focused
    useFocusEffect(
        React.useCallback(() => {
            fetchData().then(() => setIsLoading(false));
            return () => { setSelectedLetter(null); };
        }, [ sessionUser ])
    );


    async function fetchData() {
        try {
            if (sessionUser == null || sessionUser == undefined) return;
            const response = await HomeService.getOrCreateToday(sessionUser!.user_uid);
            if (response !== null) setGrape(resToHomeGrape(response));
            // else setIsError(true); //? do we need this?
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching data:', error);
            setIsError(true);
        }
    }



    const iconProps = { letter: selectedLetter?.letter || '', color: "#a8e4a0", size: 35 };

    const selectedLetterTitle = new Array(3).fill(0).map((_, i) => <Fragment key={i}>{' '}<GrapeIcons {...iconProps} />{' '}</Fragment>);

    return (
        <SafeAreaView style={my_styles.home_container}>
            {isLoading ? <Loading /> : isError ? (<View style={my_styles.main_container}>
                <Text style={my_styles.date_title}>Internal Server Error</Text>
                <Text style={my_styles.date_title}>Please try again later</Text>
            </View>) : grape && (
                <HomeComponent
                    grape={grape} 
                    setGrape={setGrape} 
                    loading={isLoading}
                />
                // <View style={my_styles.main_container}>
                //     <SafeAreaView style={my_styles.header_container}>
                //         {selectedLetter ? (
                //             <Text style={my_styles.icon_title}>
                //                 {selectedLetterTitle}
                //             </Text>
                //         ) : <Text style={my_styles.date_title}> Today: {new Date().toDateString()} </Text>}
                //     </SafeAreaView>
                //     <MyGrape grape={grape} selectedLetter={selectedLetter} setSelectedLetter={setSelectedLetter}
                //         setGrape={setGrape} 
                //     />
                // </View>
            )}
        </SafeAreaView>
    );
}
