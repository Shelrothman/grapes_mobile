import { View, Text } from 'react-native';

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
        </View>
    )
}