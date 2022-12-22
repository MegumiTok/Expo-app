import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Animated from "react-native-reanimated";
import iconAnimation from "./iconAnimation";

const LikeButtonAnimated = () => {
  const [trigger, setTrigger] = useState(false);
  const { IconFilled, IconRegular } = iconAnimation(trigger);

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => setTrigger(!trigger)}>
      <Animated.View style={IconRegular}>
        <MaterialCommunityIcons name="heart-outline" size={30} color="black" />
      </Animated.View>
      <Animated.View style={[IconFilled, styles.absolute]}>
        <MaterialCommunityIcons
          name="heart"
          size={30}
          color="rgb(237, 73, 86)"
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: "absolute"
  }
});

export default LikeButtonAnimated;
