import { useRef } from "react";
import {
  Text,
  StyleSheet,
  Image,
  Animated,
  Platform,
  Pressable
} from "react-native";
import { View } from "native-base";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "@react-navigation/native";

import Pagination from "@components/Pagination";

import { SCREEN_WIDTH, SPACING } from "@components/styles/theme/layout";
import { Colors } from "@components/styles/theme/Colors";

const ITEM_SIZE = SCREEN_WIDTH * 0.72;
const EMPTY_ITEM_SIZE = (SCREEN_WIDTH - ITEM_SIZE) / 2; //コツ

import { creators } from "@assets/data/creators";
// types ========================
import type { CreatorListProps } from "@models/NavTypes";
import type { Creator } from "@models/AuthTypes";

export const CreatorList = () => {
  const { navigate } = useNavigation<CreatorListProps>();
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View flex={1} bg={"white"}>
      <Pagination scrollX={scrollX} section={creators} />

      <Animated.FlatList
        data={creators}
        keyExtractor={(item) => item.creatorId} //ここのnullの可能性外したいので型指定でnullは不可
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{
          alignItems: "center",
          paddingHorizontal: EMPTY_ITEM_SIZE //これでいい
        }}
        bounces={false}
        snapToAlignment="start"
        decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
        snapToInterval={ITEM_SIZE}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false //falseにしないとPaginationが動かない
          }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }: { item: Creator; index: number }) => {
          if (!item.creatorPhoto) {
            //もしアイテムにポストがなかったらそばにSPACER_ITEM_SIZEを置く
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }

          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: "clamp"
          });

          return (
            <Pressable
              onPress={() =>
                // navigate("Profile", {
                //   item
                // })
                null
              }
              style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
            >
              <View style={{ width: ITEM_SIZE }}>
                <Animated.View
                  style={{
                    marginHorizontal: SPACING,
                    padding: SPACING * 2,
                    alignItems: "center",
                    transform: [{ translateY }],
                    backgroundColor: Colors.secondary.light, //image表示されないときの背景の色
                    borderRadius: 34
                  }}
                >
                  <SharedElement
                    id={`item.${item.item}.backdrop`}
                    style={StyleSheet.absoluteFillObject}
                  >
                    <Animated.View
                      style={[
                        StyleSheet.absoluteFillObject,
                        {
                          backgroundColor: "white", //カードの色
                          borderRadius: 34
                        }
                      ]}
                    />
                  </SharedElement>
                  <SharedElement
                    id={`item.${item.item}.image`}
                    style={styles.posterImage} //これを足してやらないとimageが消える
                  >
                    <Image
                      source={{ uri: item.creatorPhoto }}
                      style={styles.posterImage}
                    />
                  </SharedElement>
                  <SharedElement id={`item.${item.item}.meta`}>
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          fontSize: 24,
                          fontFamily: "NotoSansJP-Bold",
                          color: Colors.text
                        }}
                        numberOfLines={1}
                      >
                        {item.creatorName}
                      </Text>

                      {/* <Genres genres={item.genres} /> */}
                      {item.mainComment ? (
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: "KosugiMaru-Regular",
                            marginTop: 8,
                            color: Colors.text
                          }}
                          numberOfLines={3}
                        >
                          {item.mainComment}
                        </Text>
                      ) : (
                        <View />
                      )}
                    </View>
                  </SharedElement>
                </Animated.View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  posterImage: {
    borderRadius: 24,
    height: ITEM_SIZE * 1.2,
    margin: 0,
    marginBottom: 10,
    resizeMode: "cover",
    width: "100%"
  }
});
