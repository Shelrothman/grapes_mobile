import { AppRegistry, NativeModules, Platform } from 'react-native'
import App from './src/App'
// import { name as appName } from './app.json'



AppRegistry.registerComponent('main', () => App)


if (Platform.OS === 'web') {
    const rootTag = document.getElementById('root') || document.getElementById('X');
    AppRegistry.runApplication('X', { rootTag });
}