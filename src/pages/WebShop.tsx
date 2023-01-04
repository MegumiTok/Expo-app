import React, { useRef, useState } from "react";
import { Center, View, HStack, Text } from "native-base";
import { SafeAreaView, TouchableOpacity, Share, Platform } from "react-native";
import { WebView } from "react-native-webview";
import type { WebViewNavigation } from "react-native-webview";

// import * as Linking from "expo-linking";
//style----------------------------------------------------------------
import { Colors } from "@components/styles/theme/Colors";
import { SCREEN_WIDTH, SPACING } from "@components/styles/theme/layout";
import {
  AntDesign,
  Ionicons,
  FontAwesome5,
  Feather,
  MaterialCommunityIcons
} from "@expo/vector-icons";

//type---------------------------------------------------------------------
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

const localHtmlFile = require("../assets/data/test.html");
interface Props {
  navigation: NativeStackNavigationProp<any, any>;
}
import Constants from "expo-constants";
export const WebShop = ({ navigation }: Props) => {
  const ref = useRef<WebView>(null);
  const control = (controlType: "reflesh" | "back" | "forward") => {
    if (ref.current) {
      switch (controlType) {
        case "back":
          ref.current.goBack();
          break;
        case "forward":
          ref.current.goForward();
          break;

        case "reflesh":
          ref.current.reload();
          break;
      }
    }
  };
  const [navigationState, setNavigationState] =
    useState<WebViewNavigation | null>(null);

  const uri = "https://github.com/";
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <HStack
        style={{
          alignItems: "center",
          width: "100%",
          padding: 10,
          paddingBottom: SPACING,
          borderBottomColor: Colors.secondary.light,
          borderBottomWidth: 3,
          //   backgroundColor: Colors.secondary.general,
          paddingTop: Constants.statusBarHeight
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 30,
            height: 30,
            borderRadius: 30,
            marginRight: 10,
            backgroundColor: Colors.secondary.light
          }}
        >
          <Feather name="x" size={24} color="white" />
        </TouchableOpacity>
        <Text numberOfLines={1} ellipsizeMode="tail" flex={1} fontSize="sm">
          サイト名かリンクを表示
        </Text>
      </HStack>

      <WebView
        // source={{ uri }}
        source={localHtmlFile}
        startInLoadingState={true}
        style={{ width: SCREEN_WIDTH }}
      />
      <SafeAreaView
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {/* 左 ー－－－－－－－－－－－－－－－－－－－－－－－－－－*/}
        <TouchableOpacity
          onPress={() => control("back")}
          style={{ padding: SPACING }}
        >
          <Feather
            name="chevron-left"
            size={30}
            color={
              navigationState?.canGoBack
                ? Colors.secondary.general
                : Colors.accent.dark
            }
          />
        </TouchableOpacity>
        {/* 右 ー－－－－－－－－－－－－－－－－－－－－－－－－－－*/}
        <TouchableOpacity
          onPress={() => control("forward")}
          style={{ padding: SPACING }}
        >
          <Feather
            name="chevron-right"
            size={30}
            color={
              navigationState?.canGoBack
                ? Colors.secondary.general
                : Colors.accent.dark
            }
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => true} style={{ padding: SPACING }}>
          {React.createElement(
            (Platform.OS === "ios" ? Feather : MaterialCommunityIcons) as any,
            {
              name: "share",
              size: 30,
              color: Colors.secondary.general
            }
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => true} style={{ padding: SPACING }}>
          <FontAwesome5
            name={Platform.OS === "ios" ? "safari" : "chrome"}
            size={30}
            color={Colors.secondary.general}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default WebShop;
