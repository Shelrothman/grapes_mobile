import { useSearchParams } from "expo-router";
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';



const GrapeLetterPage = () => {
    const { grape_letter_id } = useSearchParams();

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            {/* <FlatList
                data={question.answers}
                renderItem={({ item }) => <AnswerListItem answer={item} />}
                ListHeaderComponent={() => <QuestionHeader question={question} />}
            /> */}
            <Text>
            {grape_letter_id}
            </Text>
        </View>
    );
}

export default GrapeLetterPage;