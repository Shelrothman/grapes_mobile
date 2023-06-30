import { usePathname } from "expo-router";
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';



const GrapeLetterPage = () => {
    // const { grape_letter_id } = useSearchParams(); its not a searchParame
    // console.log(grape_letter_id)

    let grape_letter_id = usePathname().replace('/', '');

    // console.log(usePathname());

    return (

        <SafeAreaView style={styles.container}>
            <Link href="../">{`<`}Back</Link>
            <Text style={styles.title}>
                Viewing Grape: {grape_letter_id}
            </Text>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#889CAF',
        // alignItems: 'center',
        // paddingTop: 50,
        // justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4E1E66',
    },
});



export default GrapeLetterPage;