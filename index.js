// import { AppRegistry, NativeModules, Platform } from 'react-native'
import App from './src/App'

// AppRegistry.registerComponent('main', () => App)

// if (Platform.OS === 'web') {
//     const rootTag = document.getElementById('root') || document.getElementById('X');
//     AppRegistry.runApplication('main', { rootTag });
// }

import { registerRootComponent } from 'expo';


registerRootComponent(App);