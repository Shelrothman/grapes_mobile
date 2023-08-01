import { View, Text } from 'react-native';
import { Grape, GrapeDayLetter } from '../../types';
import { history_styles } from '../../styles/history';
// import Loading from '../../utils/Loading';


type HomeGrapeLetterRowProps = {
    /** the expanded day being viewed */
    day?: GrapeDayLetter[] | null;
    /** flag indicating if there is a grape for that day or not */
    validGrape: boolean;
};

//! OKay! got the logic for this now to load and fetch the expanded and stff
// TODO next: the Display of this actual table component.. needs work to make it look like the parts on the other screens
// So PU in here and in history.ts and set that up AND the load more btton thang

/**
 * a chart/table-like component that displays one grape day
 * i.e. each letter
*/
export function HistoryGrapeBox({ day, validGrape }: HomeGrapeLetterRowProps) {

    if (validGrape) return <View style={history_styles.row}>
        <Text style={history_styles.letterValueText}> No grape recorded this day </Text>
    </View>;

    return (
        <>
            {day && day.map((day: GrapeDayLetter, x: number) => (
                <View style={x % 2 == 0 ? history_styles.row : history_styles.alt_row} key={day.letter}>
                    <View style={history_styles.letterColumn}>
                        <Text style={history_styles.letterColText}>{day.letter.toUpperCase()}</Text>
                    </View>
                    <View style={history_styles.letterValue}>
                        <Text style={history_styles.letterValueText}>
                            {day.value}
                        </Text>
                    </View>
                </View>
            ))}
        </>
    )
}
