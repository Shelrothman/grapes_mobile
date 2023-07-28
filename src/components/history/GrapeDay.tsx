import { View, Text, Pressable } from 'react-native';
import { GrapeDayLetter } from '../../types';



import { HistoryGrapeBox } from './GrapeBox';
import { history_styles } from '../../styles/history';
import { buildDateArray } from '../../utils';
import { usePressAnimation } from '../../hooks/usePressAnimation';


/*
i could jhust have it like okay give me the last ten days and put those static numbers on squares...
? and then if they click one that they dont have one for it can render "You didn;t make a grape this day" and then at the bottom will be a load more button and if they have more past that day it will render the next ten.. but if it doesnt, itll say "no more grapes found.." and then this just jkeeps going and going...
* maybe in future will tell users, history only goes back 30 days...
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
    grape_id: string;
    setDay: React.Dispatch<React.SetStateAction<GrapeDayLetter[] | null>>;
};

//!!! PU in here and get this going with the expanding the day and shizzzzz 

/**
 * @component - wrapper of HomeGrapeBox containing the Title/date of the grape day
 * displays only the date initially
 * the user must press on the date to see the full grape day expanded
 */
export function HistoryGrapeDay({ date, day, grape_id, setDay }: HomeGrapeItemProps) {
    
    const { handlePressIn, handlePressOut, pressStyle } = usePressAnimation('#cb9de2');

    const renderDateTitle = () => {
        let dateTitle: string = '';
        try {
            dateTitle = new Date(date).toDateString();
        } catch (error) {
            dateTitle = 'Load More Button'
        }
        return <Text style={history_styles.date_text}>
            {dateTitle}
        </Text>;
    };

    return (
        <View style={{ alignItems: 'center', marginTop: 30, }}>
            <Pressable style={history_styles.date_container}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                // onPress={() => setDay(day)}
                onPress={() => console.log('pressed')}
            >
                <Text style={history_styles.date_text}>
                    {new Date(date).toDateString()}
                    {/* {renderDateTitle()} */}
                </Text>
            </Pressable>
            {/* {day ? <HomeGrapeBox grape={grape} />} */}
            <View style={history_styles.box_container}>
                {/* <HomeGrapeBox grape={grape} /> */}
            </View>
        </View>
    )
}

