// @ts-nocheck
module.exports = function (api) {
    api.cache(true);
    return {
        presets: [ "babel-preset-expo" ],
        // plugins: [ this is for using expo-router
        //     "@babel/plugin-proposal-export-namespace-from",
        //     "react-native-reanimated/plugin",
        //     require.resolve("expo-router/babel"),
        // ],
    };
};
