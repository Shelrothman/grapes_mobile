/**
 * @function SharedLetter
 * @description A card-like component that displays shared cards from users
 * showing their value for the letter and their username pluys an icon depending on the letter
 */
import { Text, View } from 'react-native';
import { GlobalGrape } from '../../types';
// import { GrapeIcons } from '../../utils/Icons';
// import { GRAPE_DAY } from '../../utils/constants';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { global_styles } from '../../styles/global';
import { LetterHeader } from "../../utils/LetterHeader";

type SharedLetterProps = GlobalGrape & {
    onCopyClick: (text: string) => void;
};


export function SharedLetter({ user_name, letter, value, onCopyClick }: SharedLetterProps) {

    // todo: delete all unused styles in global.ts

    return (
        <View style={global_styles.card}>
            <LetterHeader label={letter} />
            <View style={global_styles.card_body}>
                <Text style={global_styles.value}>{value}</Text>
            </View>
            <View style={global_styles.card_footer}>
                <View style={global_styles.share_container}>
                    <FontAwesome5.Button name="copy" size={22} color="#c6bfc9" backgroundColor='#4E1E66'
                        onPress={() => onCopyClick(value)} style={global_styles.button}
                    />
                </View>
                <View style={global_styles.shared_by_container}>
                    <Text style={global_styles.shared_by}>
                        <FontAwesome name="user" size={18} color="#4E1E66" backgroundColor='transparent' />
                        {`  `}{user_name}
                    </Text>
                </View>
            </View>
        </View>
    )
}