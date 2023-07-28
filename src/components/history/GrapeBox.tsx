import { View, Text } from 'react-native';
import { Grape, GrapeDayLetter } from '../../types';
import { history_styles } from '../../styles/history';

type HomeGrapeLetterRowProps = {
    grape: Grape;
};

/**
 * a chart/table-like component that displays one grape day
 * i.e. each letter
*/
export function HomeGrapeBox({ grape }: HomeGrapeLetterRowProps) {
    return (
        <>
            {grape.day.map((day: GrapeDayLetter, x: number) => (
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
