import { View, Text } from 'react-native'
import React from 'react'
import { my_styles } from '../styles/my'
import { GRAPE_DAY } from './constants';
import { GrapeIcons } from './Icons';


type LetterHeaderProps = {
    label: string;
}
export function LetterHeader({ label }: LetterHeaderProps) {

    const GrapeTitleComponent = (letter: string): JSX.Element => {
        letter = letter.toLowerCase();
        return <Text>
            <Text style={my_styles.titleLetterText}>{letter.toUpperCase()}</Text>
            <Text style={my_styles.titleText}>{GRAPE_DAY[ letter ]}</Text>
        </Text>;
    };

    const IconContainer = (containerOne: boolean, letter: string): JSX.Element => {
        const containerStyle = containerOne ? my_styles.iconOne_container : my_styles.iconTwo_container;
        return <View style={containerStyle}><GrapeIcons letter={letter} color="#c6bfc9" size={30} /></View>;
    };

    return (
        <View style={my_styles.titleContainer}>
            {IconContainer(true, label)}{GrapeTitleComponent(label)}{IconContainer(false, label)}
        </View>
    )
}