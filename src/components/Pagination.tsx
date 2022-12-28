import type { ViewStyle } from "react-native";
import { StyleSheet, View, Animated } from "react-native";

export interface ScalingDotProps {
  dots: Array<any>;
  scrollX: Animated.Value;
  containerStyle?: ViewStyle;
  inActiveDotOpacity?: number;
  activeDotScale?: number;
}

//ローカルデータ======================================
import { creators } from "@assets/data/creators";
//style-------------------------------------------
import { Colors } from "@components/styles/theme/Colors";
import { SCREEN_WIDTH, SPACING } from "@components/styles/theme/layout";
import { ITEM_SIZE } from "@pages/CreatorList";

export const Pagination = ({
  scrollX,
  dots,
  inActiveDotOpacity, //もしpropsで値を渡したかったらこのようにする
  activeDotScale // 学習のため、使っていないが残しておく
}: ScalingDotProps) => {
  const defaultProps = {
    inActiveDotColor: "#00000070",
    activeDotColor: Colors.primary.general,
    animationType: "scale",
    inActiveDotOpacity: inActiveDotOpacity || 0.5,
    activeDotScale: activeDotScale || 1.5
  };
  // console.log("DOT_SIZEは", DOT_SIZE);
  // console.log("SCREEN_WIDTH", SCREEN_WIDTH);
  const num = dots.length;
  //アイテムの数に応じてドットサイズを変えるようにした
  const DOT_SIZE = (SCREEN_WIDTH - SPACING * 2) / (2 * num); //<-- (1)ドットの隙間がDOT_SIZE一つ分の場合
  // const DOT_SIZE = (2 * (SCREEN_WIDTH - SPACING * 2)) / (3 * num); //<-- (2)ドットの隙間がDOT_SIZE二分の一個の場合
  return (
    <View style={styles.pagination}>
      {dots.map((_, index: number) => {
        // console.log(index);
        // console.log("長さ", creators.length);
        const inputRange = [
          (index - 1) * ITEM_SIZE,
          index * ITEM_SIZE,
          (index + 1) * ITEM_SIZE
        ];
        const color = scrollX.interpolate({
          inputRange,
          outputRange: [
            defaultProps.inActiveDotColor,
            defaultProps.activeDotColor,
            defaultProps.inActiveDotColor
          ],
          extrapolate: "clamp" //これをつけないと前後３つくらいしか表示されない
        });

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [1, defaultProps.activeDotScale, 1],
          extrapolate: "clamp"
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [
            defaultProps.inActiveDotOpacity,
            1,
            defaultProps.inActiveDotOpacity
          ],
          extrapolate: "clamp"
        });
        return (
          <Animated.View
            key={`dot-${index}`}
            style={[
              {
                borderRadius: DOT_SIZE / 2,
                height: DOT_SIZE,
                marginHorizontal: DOT_SIZE / 2, //<-- (1)
                // marginHorizontal: DOT_SIZE / 4, //<-- (2)
                width: DOT_SIZE
              },
              { opacity },
              { transform: [{ scale }] },
              //   dotStyle,
              { backgroundColor: color }
            ]}
          />
        );
      })}
      {/* {console.log("scrollXは", scrollX)} */}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  pagination: {
    alignSelf: "center",
    // backgroundColor: "tomato",
    flexDirection: "row",
    position: "absolute",
    top: 50
  }
});
