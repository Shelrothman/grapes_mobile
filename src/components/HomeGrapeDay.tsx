/**
 * TODO: https://react.dev/reference/react/Component#shouldcomponentupdate
 * this is a reusable item that displays a chart-like card of each letter of the day
*/

import { View, Text, StyleSheet, Button, SafeAreaView, Pressable } from 'react-native';
import { Grape, GrapeDayLetter } from '../types';
import { useNavigation, useRouter } from 'expo-router';
import { HomeGrapeBox } from './HomeGrapeBox';

// import FontAwesome from 'react-native-vector-icons/FontAwesome';
type HomeGrapeItemProps = {
    grape: Grape;
};


// ! PU here something weird happened to the widths of all my boxes.. it was just fune
// const currentTimeStampInMilliseconds = (new Date()).getTime();


export function HomeGrapeDay({ grape }: HomeGrapeItemProps) {

    const navigation = useNavigation();
    const router = useRouter();
    const handleOnPress = () => {
        // console.log('handleOnPress', grape);
        // navigation.navigate(`/${grape.item_id}`);
        // navigation.
        router.push(`/${grape.item_id}`);
    }

    return (
        <View style={styles.whole_container}>
            <Pressable onPress={handleOnPress} 
            // hitSlop={15}
            style={({ pressed }) => [
                // {
                //     backgroundColor: pressed
                //         ? 'pink'
                //         : 'none'
                // },
                {   
                    // marginLeft: 10,
                    // marginRight: 10,
                }
                // styles.box_container
            ]}
                //TODO onPressIn=function to change the style of the box to be darker or something while its being pressed
            >
                <View style={styles.title_container}>
                    <Text style={styles.title}>
                        {new Date(grape.creation_date * 1000).toDateString()}
                    </Text>
                </View>
                <View style={styles.box_container}>
                    <HomeGrapeBox grape={grape} />
                </View>
            </Pressable>

        </View>
    )
}


const styles = StyleSheet.create({
    box_container: {
        borderRadius: 10,
        borderColor: '#4E1E66',
        backgroundColor: '#8ABDAA',
        alignContent: 'center',
        borderWidth: 2.5,
        minWidth: '85%',
        maxWidth: '85%',
    },
    whole_container: {
        alignItems: 'center',
    },
    title_container: {
        alignItems: 'center',  
        marginBottom: 5, 
    },
    title: {
        color: '#aa54ff',
        fontWeight: 'bold',
    },
});