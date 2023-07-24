import { useState, Fragment } from "react";
import { View, Text, SafeAreaView } from 'react-native';
import { MyGrape } from "./MyGrape";
// import { getGrapeById } from "../../utils";
import { GrapeIcons } from "../../utils/Icons";
import { Grape, GrapeDayLetter, GrapeResponse } from "../../types";
import { my_styles } from "../../styles/my";
import { useHomeGrapeContext } from "../../contexts/HomeGrapeContext";
import { defaultGrape_UI } from "../../utils/constants";

const avoidArray = [ 'grape_id', 'user_id', 'created_at' ];

// TODO move to own file
const resToGrape = (res: Partial<GrapeResponse>): Grape => {
    let dayArray: any[] = Object.entries(res).map(([ key, value ]) => {
        if (avoidArray.includes(key)) return;
        return { letter: key, value: value as string };
    }).filter((item) => item !== undefined);

    return {
        grape_id: res.grape_id!,
        day: dayArray as GrapeDayLetter[],
        creation_date: res.created_at!,
    }
};

export default function Home() {

    const { today_grape } = useHomeGrapeContext();
    const [ selectedLetter, setSelectedLetter ] = useState<GrapeDayLetter | null>(null);


    // TODO come back and implement this being TODAYS grape.. hard coding for nowq

    const grape = today_grape ? resToGrape(today_grape) : defaultGrape_UI;
    
    if (!grape) return <SafeAreaView style={my_styles.main_container}>
        <Text>404 Not Found</Text>
    </SafeAreaView>;

    const iconProps = { letter: selectedLetter?.letter || '', color: "#a8e4a0", size: 35 };

    const selectedLetterTitle = new Array(3).fill(0).map((_, i) => <Fragment key={i}>{' '}<GrapeIcons {...iconProps} />{' '}</Fragment>);

    return (
        <SafeAreaView style={my_styles.home_container}>
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
        </SafeAreaView>
    );
}
