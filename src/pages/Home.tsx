import { StyleSheet, View, Text, FlatList } from 'react-native';
import * as grapes from '../data/dummyGrapes.json';
import { HomeGrapeItem } from '../components/HomeGrapeItem';


export function Home() {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <FlatList
                data={grapes.items}
                renderItem={({ item }) => <HomeGrapeItem grape={item} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#889CAF',
        alignItems: 'center',
        // justifyContent: 'center',
    },
});
