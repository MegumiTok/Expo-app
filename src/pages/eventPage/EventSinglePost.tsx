import { useState } from "react";
import { View, Text, Center } from "native-base";
import type { EventType } from "@models/EventType";
import type { FC } from "react";
import type { EventSinglePostProps } from "@models/NavTypes";
import { WebView } from "react-native-webview";
import type { WebViewNavigation } from "react-native-webview";
import { SCREEN_WIDTH } from "@components/styles/theme/layout";

export const EventSinglePost: FC<EventSinglePostProps> = ({ route }) => {
  const [navigationState, setNavigationState] =
    useState<WebViewNavigation | null>(null);
  const { item } = route.params;
  console.log("ログ:", item.title);

  if (!item.eventURL) {
    return (
      <Center flex={1}>
        <Text>eventURLが設定されていません</Text>
      </Center>
    );
  }
  return (
    <Center flex={1}>
      <WebView
        // ref={ref}
        originWhitelist={["*"]}
        allowsLinkPreview
        allowsInlineMediaPlayback
        allowsBackForwardNavigationGestures
        sharedCookiesEnabled
        enableApplePay
        // onNavigationStateChange={setNavigationState}
        // source={{ uri: route.params.url }}
        source={{
          uri: item.eventURL
        }}
        style={{ width: SCREEN_WIDTH }}
      />
    </Center>
  );
};

export default EventSinglePost;
