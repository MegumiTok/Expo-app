module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // [
      //   "module:react-native-dotenv",
      //   {
      //     //https://github.com/goatandsheep/react-native-dotenv
      //     envName: "APP_ENV",
      //     moduleName: "@env",
      //     path: ".env",
      //     blocklist: null,
      //     allowlist: null,
      //     safe: false,
      //     allowUndefined: true,
      //     verbose: false
      //   }
      // ],
      "babel-plugin-styled-components",
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@models": "./src/models",
            "@functions": "./src/functions",
            "@Redux": "./src/redux",
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@private": "./src/private",
            "@navigation": "./src/navigation",
            "@hooks": "./src/hooks",
            "@pages": "./src/pages"
          }
        }
      ],
      // Reanimated plugin has to be listed last.
      "react-native-reanimated/plugin"
    ]
  };
};
