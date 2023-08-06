import { AppRegistry, Platform } from 'react-native'
import App from './src/App'
import { registerRootComponent } from 'expo';


if (Platform.OS === 'web') {
    AppRegistry.registerComponent('main', () => App)
    const rootTag = document.getElementById('root') || document.getElementById('X');
    AppRegistry.runApplication('main', { rootTag });
}



registerRootComponent(App);