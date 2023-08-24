import { useState } from 'react';
import { View, Text } from 'react-native';
import { Grape, GrapeDayLetter } from '../../types';
import { history_styles } from '../../styles/history';
import { ShareComponent } from '../my/Share';
import Loading from '../../utils/Loading';

type HomeGrapeLetterRowProps = {
    /** the expanded day being viewed */
    day?: GrapeDayLetter[] | null;
    /** flag indicating if there is a grape for that day or not */
    validGrape: boolean;
};



const isLast = (index: number, arr: any[]) => index === arr.length - 1;

/**
 * a chart/table-like component that displays one grape day
 * i.e. each letter
*/
export function HistoryGrapeBox({ day, validGrape }: HomeGrapeLetterRowProps) {

    const [ loading, setLoading ] = useState<boolean>(false);

    // ? why is this working?
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
            {loading ? <Loading /> : <>
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
                            <ShareComponent color="#4E1E66" btnSize={25}
                                grape_day_letter={day} setLoading={setLoading} editMode={false}
                                // loading={loading} setLoading={setLoading}s
                            />
                        </View>
                    </View>
                ))}
            </>}
        </>
    )
}
