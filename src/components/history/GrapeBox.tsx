import { View, Text } from 'react-native';
import { Grape, GrapeDayLetter } from '../../types';
import { history_styles } from '../../styles/history';
// import Loading from '../../utils/Loading';
import { ShareComponent } from '../my/Share';

type HomeGrapeLetterRowProps = {
    /** the expanded day being viewed */
    day?: GrapeDayLetter[] | null;
    /** flag indicating if there is a grape for that day or not */
    validGrape: boolean;
};


// TODO next: the Display of this actual table component.. needs work to make it look like the parts on the other screens
// So PU in here and in history.ts and set that up AND the load more btton thang

// TODO also need a share button for each letter row
// and then lastly the load more button

const isLast = (index: number, arr: any[]) => index === arr.length - 1;

/**
 * a chart/table-like component that displays one grape day
 * i.e. each letter
*/
export function HistoryGrapeBox({ day, validGrape }: HomeGrapeLetterRowProps) {

    if (validGrape) return <View style={history_styles.noop_row}>
        <Text style={history_styles.letterValueText}> No grape recorded this day </Text>
    </View>;

    const viewStyle = (index: number) => {
        if (day) {
            if (isLast(index, day)) return history_styles.last_row;
        }
        return index % 2 == 0 ? history_styles.row : history_styles.alt_row;
    }

    return (
        <>
            {day && day.map((day: GrapeDayLetter, x: number) => (
                <View style={viewStyle(x)} key={day.letter}>
                    <View style={history_styles.letterColumn}>
                        <Text style={history_styles.letterColText}>{day.letter.toUpperCase()}</Text>
                    </View>
                    <View style={history_styles.letterValue}>
                        <Text style={history_styles.letterValueText}>
                            {day.value}
                        </Text>
                    </View>
                    <View style={history_styles.shareCol}>
                        {/* <Text>
                            share
                        </Text> */}
                        <ShareComponent
                            color="#4E1E66"
                            btnSize={25}
                            grape_day_letter={day}
                            setLoading={() => { }}
                            editMode={false}
                        />
                    </View>
                </View>
            ))}
        </>
    )
}
