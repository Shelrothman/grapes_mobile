import { AppRegistry, Platform } from 'react-native'
import App from './src/App'
import { registerRootComponent } from 'expo';

// AppRegistry.registerComponent('main', () => App)

if (Platform.OS === 'web') {
    const rootTag = document.getElementById('root') || document.getElementById('X');
    AppRegistry.runApplication('main', { rootTag });
}



registerRootComponent(App);