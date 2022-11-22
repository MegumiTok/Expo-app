import type { ViewStyle } from "react-native";
import { StyleSheet, View, Animated } from "react-native";

export interface ScalingDotProps {
  section: Array<any>;
  data?: Array<any>;
  scrollX: Animated.Value;
  containerStyle?: ViewStyle;
  inActiveDotOpacity?: number;
  inActiveDotColor?: string;
  activeDotScale?: number;
  activeDotColor?: string;
}
import { creators } from "@assets/data/creators";
//style-------------------------------------------
import { Colors } from "@components/styles/theme/Colors";
import { SCREEN_WIDTH } from "@components/styles/theme/layout";
const ITEM_SIZE = SCREEN_WIDTH * 0.72;
const DOT_SIZE = SCREEN_WIDTH / creators.length - 8 * 2; //アイテムの数に応じてドットサイズを変えるようにした

export const Pagination = ({
  scrollX,
  section,
  data,

  //   dotStyle,
  containerStyle,
  inActiveDotOpacity,
  inActiveDotColor,
  activeDotScale,
  activeDotColor
}: ScalingDotProps) => {
  const defaultProps = {
    inActiveDotColor: inActiveDotColor || "#00000070",
    activeDotColor: activeDotColor || Colors.primary.general,
    animationType: "scale",
    inActiveDotOpacity: inActiveDotOpacity || 0.5,
    activeDotScale: activeDotScale || 1.5
  };

  return (
    <View style={styles.pagination}>
      {/* {section ? section : section=data} */}
      {section.map((_, index: number) => {
        const inputRange = [
          (index - 1) * ITEM_SIZE,
          index * ITEM_SIZE,
          (index + 1) * ITEM_SIZE
        ];
        const colour = scrollX.interpolate({
          inputRange,
          outputRange: [
            defaultProps.inActiveDotColor,
            defaultProps.activeDotColor,
            defaultProps.inActiveDotColor
          ],
          extrapolate: "clamp" //これをつけないと前後３つくらいしか表示されない
        });

        const scale = scrollX.interpolate({
          inputRange: inputRange,
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
              styles.dotStyle,
              { opacity },
              { transform: [{ scale }] },
              //   dotStyle,
              { backgroundColor: colour }
            ]}
          />
        );
      })}
      {/* {console.log(scrollX)} */}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  dotStyle: {
    borderRadius: DOT_SIZE / 2,
    height: DOT_SIZE,
    marginHorizontal: DOT_SIZE / 2,
    width: DOT_SIZE
  },

  pagination: {
    alignSelf: "center",
    flexDirection: "row",
    // height: DOT_SIZE,
    position: "absolute",
    top: 50
    // paddingTop: 50,
  }
});
