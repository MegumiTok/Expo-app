import type { FC } from "react";
import { LogBox } from "react-native";

// import { useFonts } from "@use-expo/font";

import * as SplashScreen from "expo-splash-screen";
import { NativeBaseProvider } from "native-base";
import Navigation from "./src/navigation/Navigation";
import useCachedResources from "./src/hooks/useCachedResources";

LogBox.ignoreAllLogs();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const App: FC = () => {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider>
        <Navigation />
      </NativeBaseProvider>
    );
  }
};

export default App;

//✅ エラーなく動いてる
//🔧:直してる途中
