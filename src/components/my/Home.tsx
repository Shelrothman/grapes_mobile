import { useState, Fragment } from "react";
import { View, Text, SafeAreaView } from 'react-native';
import { MyGrape } from "./MyGrape";
import { getGrapeById } from "../../utils";
import { GrapeIcons } from "../../utils/Icons";
import { GrapeDayLetter } from "../../types";
import { my_styles } from "../../styles/my";


export default function Home() {

    const [ selectedLetter, setSelectedLetter ] = useState<GrapeDayLetter | null>(null);


    // TODO come back and implement this being TODAYS grape.. hard coding for nowq
    const grape = getGrapeById(0);
    // * maybe need somehting like new Grape() here and it has the default values ready to go.

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
