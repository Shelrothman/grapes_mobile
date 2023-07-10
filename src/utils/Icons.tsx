
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

type IconsProps = {
    letter: string;
    // size: number;
    color: string;
};


export function GrapeIcons({ letter, color }: IconsProps) {

    switch (letter) {
        case 'G':
            return <MaterialIcons name="self-improvement" size={25} color={color} />;
        case 'R':
            return <FontAwesome5 name="spa" size={24} color={color} />
        case 'A':
            return <MaterialIcons name="emoji-events" size={24} color={color} />;
        case 'P':
            return <Ionicons name="md-happy-sharp" size={24} color={color} />;
        case 'E':
            return <MaterialCommunityIcons name="weight-lifter" size={24} color={color} />
        case 'S':
            return <FontAwesome5 name="people-arrows" size={24} color={color} />
        default:
            // just in case, but should never happen
            return <MaterialIcons name="self-improvement" size={25} color={color} />;
    }
}
