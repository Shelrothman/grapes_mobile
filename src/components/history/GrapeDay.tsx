import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { GrapeDayLetter } from '../../types';
import { HistoryGrapeBox } from './GrapeBox';
import { history_styles } from '../../styles/history';
import { usePressAnimation } from '../../hooks/usePressAnimation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HistoryService } from "../../services/HistoryService";
import { resToGrape } from '../../utils';

/*
* at the bottom will be a load more button and if they have more past that day it will render the next ten.. 
? but if it doesnt, itll say "no more grapes found.." and then this just jkeeps going and going...
* maybe in THE WELCOME SCREEN will tell users, history only goes back 30 days...
? and then i need to make that policy happen in my backend
* yea maybe we dont go back farther than a month
.. encourage users to save the ones they like as photos on their phone...
    https://docs.expo.dev/tutorial/screenshot/
    TODO do this in Global also.. the load just ten and then load more if they want more... 
*/


type HomeGrapeItemProps = {
    date: string;
    /** the expanded day being viewed */
    day: GrapeDayLetter[] | null;
    setDay: React.Dispatch<React.SetStateAction<GrapeDayLetter[] | null>>;
    /** the date of the grape day being viewed */
    setGrape_date: React.Dispatch<React.SetStateAction<string | null>>;
};


const ExpandDownIcon = () => <MaterialCommunityIcons name="arrow-expand-down" size={24} color="#cb9de2" style={history_styles.expander} />
const ExpandLeftIcon = () => <MaterialCommunityIcons name="arrow-expand-left" size={24} color="#cb9de2" style={history_styles.expander} />

/**
 * @component - wrapper of HomeGrapeBox containing the Title/date of the grape day
 * displays only the date initially
 * the user must press on the date to see the full grape day expanded
 */
export function HistoryGrapeDay({ date, day, setDay, setGrape_date }: HomeGrapeItemProps) {
    const { handlePressIn, handlePressOut, pressStyle } = usePressAnimation('#8ABDAA');
    const [ validGrape, setValidGrape ] = useState<boolean | null>(null);


    const setDayAndValidity = (dayValue: GrapeDayLetter[] | null, validValue: boolean | null) => {
        setDay(dayValue);
        setValidGrape(validValue);
    };

    const handlePress = async () => {
        if (day !== null) return setDayAndValidity(null, null);
        const historyService = new HistoryService();
        setGrape_date(date); // control which one is expanded
        const viewGrape = await historyService.getGrapeByDate(date);
        if (!viewGrape) return setDayAndValidity([], false);
        return setDayAndValidity(resToGrape(viewGrape).day, true);
    };

    const dateTitle:string = new Date(date).toDateString();

    return (
        <View style={{ alignItems: 'center', marginTop: 30, }}>
            <Pressable
                style={{ ...history_styles.date_container, ...pressStyle, }}
                onPressIn={handlePressIn} onPressOut={handlePressOut}
                onPress={handlePress} key={date}
            >
                <Text style={history_styles.date_text} key={date}>{dateTitle}</Text>
                {day == null ? <ExpandDownIcon /> : <ExpandLeftIcon />}
            </Pressable>
            <View style={history_styles.box_container}>
                {day == null ? <></>
                    : (validGrape === true) ? <HistoryGrapeBox day={day} validGrape={false} />
                        : <HistoryGrapeBox day={day} validGrape={true} />}
            </View>
        </View>
    )
}

