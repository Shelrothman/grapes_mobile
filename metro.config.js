/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 */
// module.exports = {
//     transformer: {
//         getTransformOptions: async () => ({
//             transform: {
//                 experimentalImportSupport: false,
//                 inlineRequires: true,
//             },
//         }),
//     },
// }

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;
