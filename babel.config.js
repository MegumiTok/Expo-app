module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "babel-plugin-styled-components",
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@models": "./src/models",
            "@functions": "./src/functions",
            // "@redux": "./src/redux",
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@private": "./src/private",
            "@navigation": "./src/navigation",
            "@hooks": "./src/hooks"
          }
        }
      ],
      // Reanimated plugin has to be listed last.
      "react-native-reanimated/plugin"
    ]
  };
};
