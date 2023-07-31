import { View, Text } from 'react-native';
import { Grape, GrapeDayLetter } from '../../types';
import { history_styles } from '../../styles/history';

type HomeGrapeLetterRowProps = {
    // grape: Grape|null; 
    // grape_id: string | null;
    day?: GrapeDayLetter[] | null;
    // creation_date: string;
    // altMessage?: string;
    /** flag indicating if there is a grape for that day or not */
    validGrape: boolean;
};

/**
 * a chart/table-like component that displays one grape day
 * i.e. each letter
*/
export function HistoryGrapeBox({ day, validGrape }: HomeGrapeLetterRowProps) {
    
    if (validGrape) return <Text> No grape recorded this day </Text>;

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
