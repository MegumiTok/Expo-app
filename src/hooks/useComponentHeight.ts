import { useState, useCallback } from "react";
import type { FC, ComponentProps } from "react";
import type { View } from "native-base";
import type { LayoutChangeEvent } from "react-native";

//get the Size of component
export const useComponentHeight = () => {
  const [topHeight, setHeight] = useState(0);

  const onLayout: ComponentProps<typeof View>["onLayout"] = useCallback(
    (e: LayoutChangeEvent) => {
      setHeight(e.nativeEvent.layout.height);
    },
    []
  );

  return [topHeight, onLayout]; //分かりやすくするためにheightからtopHeightに名前変更
};
