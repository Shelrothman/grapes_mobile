import { View, Text, } from 'react-native';
import { Grape } from '../../types';
import { HomeGrapeBox } from './GrapeBox';
import { history_styles } from '../../styles/history';


type HomeGrapeItemProps = { grape: Grape; };



/**
 * @component - wrapper of HomeGrapeBox containing the Title/date of the grape day
 */
export function HistoryGrapeDay({ grape }: HomeGrapeItemProps) {


    return (
        <View style={{ alignItems: 'center', marginTop: 30, }}>
            <View style={{ alignItems: 'center', marginBottom: 10, }}>
                <Text style={{ color: '#aa54ff', fontWeight: 'bold', }}>
                    {new Date(+grape.creation_date * 1000).toDateString()}
                </Text>
            </View>
            <View style={history_styles.box_container}>
                <HomeGrapeBox grape={grape} />
            </View>
        </View>
    )
}

