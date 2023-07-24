import { useState, Fragment, useEffect } from "react";
import { View, Text, SafeAreaView } from 'react-native';
import { MyGrape } from "./MyGrape";
import { resToGrape } from "../../utils";
import { GrapeIcons } from "../../utils/Icons";
import { Grape, GrapeDayLetter, GrapeResponse } from "../../types";
import { my_styles } from "../../styles/my";
import { useHomeGrapeContext } from "../../contexts/HomeGrapeContext";
import { defaultGrape_UI } from "../../utils/constants";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import { HomeService } from "../../services/HomeService";
import Loading from "../../utils/Loading";


export default function Home() {
    const homeService = new HomeService();
    const { today_grape } = useHomeGrapeContext();
    const [ selectedLetter, setSelectedLetter ] = useState<GrapeDayLetter | null>(null);
    const [ grape, setGrape ] = useState<Grape | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    useRefreshOnFocus(fetchDataInit);
    // const grape = today_grape ? resToGrape(today_grape) : defaultGrape_UI;

    useEffect(() => {
        fetchDataInit();
    }, []);

    // const [ grape, setGrape ] = useState<Grape>(today_grape ? resToGrape(today_grape) : defaultGrape_UI);

    async function fetchDataInit() {
        try {
            if (!today_grape || !today_grape.grape_id) return;
            const response = await homeService.getRowByGrapeId(today_grape.grape_id);
            if (response) setGrape(resToGrape(response));
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching data:', error);
        }
    }
    // if (!grape) return <SafeAreaView style={my_styles.main_container}>
    //     <Text>404 Not Found</Text>
    // </SafeAreaView>;

    const iconProps = { letter: selectedLetter?.letter || '', color: "#a8e4a0", size: 35 };

    const selectedLetterTitle = new Array(3).fill(0).map((_, i) => <Fragment key={i}>{' '}<GrapeIcons {...iconProps} />{' '}</Fragment>);

    return (
        <SafeAreaView style={my_styles.home_container}>
            {isLoading ? <Loading /> : grape && (
                <View style={my_styles.main_container}>
                    <SafeAreaView style={my_styles.header_container}>
                        {selectedLetter ? (
                            <Text style={my_styles.icon_title}>
                                {selectedLetterTitle}
                            </Text>
                        ) : <Text style={my_styles.date_title}> Today: {new Date().toDateString()} </Text>}
                    </SafeAreaView>
                    <MyGrape grape={grape} selectedLetter={selectedLetter} setSelectedLetter={setSelectedLetter} />
                </View>
            )}
        </SafeAreaView>
    );
}
