import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

//==============================-
//fontのローディングするのに↓この公式サイト
//https://docs.expo.dev/versions/latest/sdk/splash-screen/
//見たくuseCallbackとonLayoutを使いこなした方がいいのかもしれないが、、試しにやった時動かなかったので後日検証求む。
//============================

export default function useCachedResources() {
  const [isLoading, setIsLoading] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          //太さはフォントで調整するよりstyleで調整した方が綺麗かも
          //https://fonts.google.com/noto/specimen/Noto+Sans+JP
          "KosugiMaru-Regular": require("@assets/fonts/KosugiMaru-Regular.ttf"),
          "NotoSansJP-Medium": require("@assets/fonts/NotoSansJP-Medium.otf"), //ちょっと薄い
          "NotoSansJP-Regular": require("@assets/fonts/NotoSansJP-Regular.otf"), //かなり薄い
          "NotoSansJP-Bold": require("@assets/fonts/NotoSansJP-Bold.otf") //太い
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setIsLoading(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoading;
}
