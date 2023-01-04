import "dotenv/config";

export default {
  expo: {
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends."
        }
      ]
    ],
    name: "my-app-v3",
    slug: "my-app-v3",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/icon.png",
    splash: {
      image: "./src/assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      }
    },
    web: {
      favicon: "./src/assets/favicon.png"
    },
    extra: {
      // apiKey: process.env.API_KEY,
      // authDomain: process.env.AUTH_DOMAIN,
      // projectId: process.env.PROJECT_ID,
      // storageBucket: process.env.STORAGE_BUCKET,
      // messagingSenderId: process.env.MESSAGING_SENDER_ID,
      // appId: process.env.APP_ID,
      // measurementId: process.env.MEASUREMENT_ID
      eas: {
        projectId: "fe4e3af6-d97b-427c-b5fb-ac1a6f4b408c"
      }
    }
  }
};
