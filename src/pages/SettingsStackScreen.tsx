import { View, Text, Button } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { About, Account, 
    // Edit, 
    // Share 
} from './';

// 🍇🍇🍇



function SettingsScreen({ navigation }: any) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <Text>Settings screen</Text> */}
            <Button
                title="About GRAPES™"
                onPress={() => navigation.navigate('About')}
            />
            <br />
            <Button
                title="Account Settings & Preferences"
                onPress={() => navigation.navigate('About')}
            />
            
        </View>
    );
}

const SettingsStack = createNativeStackNavigator() as any;

export function SettingsStackScreen() {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="More.." component={SettingsScreen} />
            <SettingsStack.Screen name="About" component={About} options={{ title: 'About GRAPES™' }} />
            <SettingsStack.Screen name="Account Settings & Preferences" component={Account} />
        </SettingsStack.Navigator>
    );
}