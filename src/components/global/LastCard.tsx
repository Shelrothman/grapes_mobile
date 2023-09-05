/** 
 * @component LastCard
 * @description added to end of array once db is queried for all shared letters 
 * SO THAT the last card is visible once there are none left with a clickable button to scroll to top
 */
import { global_styles } from '../../styles/global';
import { View, Text, Pressable } from 'react-native';


type LastCardProps = {
    onClick: () => void;
};

export function LastCard({ onClick }: LastCardProps) {

    return (
        <View style={global_styles.card}>
            {/* <LetterHeader label={letter} /> */}
            <View style={{
                ...global_styles.card_body, borderTopStartRadius: 10, borderTopEndRadius: 10,
            }}>
                <Text style={global_styles.value}>
                    End of available data.
                </Text>
            </View>
            <View style={global_styles.card_footer_last}>
                <Pressable
                    style={global_styles.load_container}
                    onPress={() => onClick()}
                >
                    <Text style={{ fontFamily: 'Body-Reg', }}>Back To Top</Text>
                </Pressable>
            </View>
        </View>
    )

}