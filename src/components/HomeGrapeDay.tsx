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
        <View style={styles.link_container}>
            <Pressable onPress={handleOnPress} hitSlop={15}
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
        // borderWidth: 0.5,
        backgroundColor: '#8ABDAA',
        // width: '100%',
        // justifyContent: 'center',
        borderWidth: 2.5,
    },
    title_container: {
        alignItems: 'center',  
        marginBottom: 5, 
    },
    link_container: {
        // borderRadius: 10,
        // width: '100%',
        // flex: 1,
        // marginVertical: 15,
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignContent: 'center',
    },
    title: {
        // borderRadius: 10,
        color: '#aa54ff',
        // marginVertical: 5,
        fontWeight: 'bold',
    },
});