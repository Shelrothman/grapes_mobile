import { Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

type IconsProps = {
    letter: string;
    size?: number;
    color: string;
};


export function GrapeIcons({ letter, color, size }: IconsProps) {
    const iconSize = size ? size : 25; // 25 unless otherwise specified
    switch (letter) {
        case 'G':
            // return <MaterialIcons name="self-improvement" size={iconSize} color={color} />;
            return <MaterialCommunityIcons name="head-heart" size={iconSize} color={color} />
        case 'R':
            return <FontAwesome5 name="spa" size={iconSize} color={color} />
        case 'A':
            return <MaterialIcons name="emoji-events" size={iconSize} color={color} />;
        case 'P':
            return <Ionicons name="md-happy-sharp" size={iconSize} color={color} />;
        case 'E':
            return <MaterialCommunityIcons name="weight-lifter" size={iconSize} color={color} />
        case 'S':
            return <FontAwesome5 name="people-arrows" size={iconSize} color={color} />
        default:
            // just in case, but should never happen
            return <Text>No icon </Text>;
    }
}
