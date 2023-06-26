import { View, Text, StyleSheet } from 'react-native';
import { Grape } from '../types';
/**
 * 
 * this is a reusable item that displays a chart-like card of each letter of the day
 */


type HomeGrapeItemProps = {
    grape: Grape;
};


export function HomeGrapeItem({ grape }: HomeGrapeItemProps) {
    return (
        <View style={styles.container}>
            {/* <Text style={styles.stats}>
                {question.score} votes · {question.answer_count} answers ·{' '}
                {question.view_count} views
            </Text> */}
            <Text style={styles.title}>{new Date(grape.creation_date * 1000).toDateString()}</Text>
            <Text style={styles.body} numberOfLines={2}>
                {/* {decode(question.body_markdown)} */}
                {JSON.stringify(grape.day)}
            </Text>
            {/* Tags */}
            {/* <View style={styles.tags}>
                {question.tags.map((tag: any) => (
                    <Text style={styles.tag} key={tag}>
                        {tag}
                    </Text>
                ))}
                <Text style={styles.time}>
                    asked {new Date(question.creation_date * 1000).toDateString()}
                </Text>
            </View> */}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderColor: 'lightgray',
    },
    stats: {
        fontSize: 12,
    },
    title: {
        color: '#0063bf',
        marginVertical: 5,
    },
    body: {
        fontSize: 11,
        color: 'dimgray',
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    tag: {
        backgroundColor: '#e1ecf4',
        color: '#39739d',
        padding: 5,
        borderRadius: 3,
        overflow: 'hidden',
        fontSize: 12,
    },
    time: {
        marginLeft: 'auto',
        fontSize: 12,
        color: 'dimgray',
    },
});