import { View, Text, StyleSheet } from 'react-native';
import { A } from '@expo/html-elements';

// to learn more: https://www.cogtoolz.com/pages/grapes-tool


// * for linking:
/*


read through other options
https://docs.expo.dev/guides/linking/

```
npx expo install @expo/html-elements

import { A } from '@expo/html-elements';

export default function App() {
    return <A href="https://google.com">Go to Google</A>;
}
```
*/


export function About() {
    return (
        <View>
            <Text>About</Text>

            <Text>
                a bunch of information about grapes and broken into cateogires for any user of any age to understand
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem maiores animi amet iure voluptatum nesciunt ex reiciendis magnam iusto voluptatibus accusamus, fugiat, nulla quasi quam aliquam cumque? Voluptas, quo tenetur.
            </Text>

            <View style={styles.links_container}>

                {/* <Text> */}
                    <A href="https://www.cogtoolz.com/pages/grapes-tool">learn more about GRAPES™</A>
                {/* </Text> */}
                <Text>
                    learn more about CBT™ at
                </Text>
                <Text>
                    learn more about DBT™ at
                </Text>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    links_container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
});