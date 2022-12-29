//Make some waves!====
//https://getwaves.io/

import { useRef, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  Image,
  Animated,
  Platform,
  Pressable,
  Alert
} from "react-native";
import { View } from "native-base";
import Svg, { Path } from "react-native-svg";
import Pagination from "@components/Pagination";

//styles==========================
import { SCREEN_WIDTH, SPACING } from "@components/styles/theme/layout";
import { Colors } from "@components/styles/theme/Colors";
import { LoadingView } from "@components/styles/LoadingView";
import ErrorPage from "@components/ErrorPage";

export const ITEM_SIZE = SCREEN_WIDTH * 0.72;
const EMPTY_ITEM_SIZE = (SCREEN_WIDTH - ITEM_SIZE) / 2; //コツ
import { TEST_IMAGE } from "src/config/const";

import { useNavigation } from "@react-navigation/native";
// import { creators } from "@assets/data/creators"; //ローカルデータ
// types ========================
import type { CreatorListProps } from "@models/NavTypes";
import type { Creator } from "@models/AuthTypes";

//redux----------------------------------------------------------------
import { useAppDispatch, useAppSelector } from "@Redux/hook";
import { selectAllCreators } from "@Redux/creatorsSlice";
import { fetchCreators } from "@Redux/creatorsActions";

const CreatorExcerpt = ({ creators }: { creators: Creator[] }) => {
  const { navigate } = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View flex={1} bg={"white"}>
      <Pagination scrollX={scrollX} dots={creators} />
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
                navigate("Profile", {
                  item
                })
              }
              style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
            >
              <View style={{ width: ITEM_SIZE }}>
                <Animated.View
                  style={{
                    marginHorizontal: SPACING,
                    padding: SPACING * 2,
                    alignItems: "center",
                    shadowColor: Colors.primary.dark,
                    shadowRadius: 10,
                    shadowOpacity: 0.6,
                    elevation: 8,
                    shadowOffset: {
                      width: 0,
                      height: 4
                    },
                    transform: [{ translateY }]
                  }}
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

                  <Image
                    source={{
                      uri: item.creatorPhoto || TEST_IMAGE
                    }}
                    style={styles.posterImage}
                  />
                  <View
                    style={{
                      position: "absolute",
                      backgroundColor: Colors.primary.dark,
                      width: ITEM_SIZE - SPACING * 2,
                      bottom: 0,
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20
                    }}
                  >
                    <Svg
                      height="120%"
                      width="100%"
                      viewBox="0 0 1440 320"
                      style={{
                        position: "absolute",
                        bottom: 48 //<------ ここの計算が現在適当。おそらくコメント数の上限を設けることで値を固定する方法がいい。
                      }}
                    >
                      <Path
                        fill={Colors.primary.dark}
                        d="M0,32L48,37.3C96,43,192,53,288,74.7C384,96,480,128,576,144C672,160,768,160,864,144C960,128,1056,96,1152,80C1248,64,1344,64,1392,64L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                      />
                    </Svg>
                    {/* </View> */}
                    <View style={{ alignItems: "center", padding: 10 }}>
                      <Text
                        style={{
                          fontSize: 24,
                          fontFamily: "NotoSansJP-Bold",
                          color: "white"
                        }}
                        numberOfLines={1}
                      >
                        {item.creatorName}
                      </Text>

                      {/* <Genres genres={item.genres} /> */}

                      {item.mainComment ? (
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: "KosugiMaru-Regular",
                            marginTop: 8,
                            color: "white"
                          }}
                          numberOfLines={3}
                        >
                          {item.mainComment}
                        </Text>
                      ) : (
                        <View />
                      )}
                    </View>
                  </View>
                </Animated.View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

// メイン＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
export const CreatorList = () => {
  const dispatch = useAppDispatch();
  const creators = useAppSelector(selectAllCreators);
  const creatorStatus = useAppSelector((state) => state.creators.status);
  const error = useAppSelector((state) => state.creators.error);

  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(fetchCreators());
      } catch (e) {
        Alert.alert("fetchPostsに失敗しました。");
        console.log("エラー:", e);
      }
    };

    fetch();
  }, [dispatch]);

  let content;
  if (creatorStatus === "loading") {
    content = <LoadingView />;
  } else if (creatorStatus === "succeeded") {
    content = <CreatorExcerpt creators={creators} />;
  } else if (creatorStatus === "failed") {
    content = <ErrorPage error={error} />;
  }
  return <>{content}</>;
};

const styles = StyleSheet.create({
  posterImage: {
    // borderRadius: 24,
    height: ITEM_SIZE * 1.2,
    // margin: 0,
    marginBottom: 25,
    resizeMode: "contain",
    width: "100%"
  },
  svgCurve: {
    position: "absolute",
    width: ITEM_SIZE - SPACING * 2
  }
});
