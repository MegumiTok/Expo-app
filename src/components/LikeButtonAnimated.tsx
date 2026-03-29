import { memo, useState, useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Animated from "react-native-reanimated";
import IconAnimation from "./IconAnimation";
import { useAppDispatch } from "@Redux/hook";
import { updateLike } from "@Redux/postActions";

import type { Post } from "@models/PostTypes";
import { Colors } from "@components/styles/theme/Colors";
import { ICON_SIZE_LG } from "@components/styles/theme/layout";

const LikeButtonAnimated = memo(({ item }: { item: Post }) => {
  const [trigger, setTrigger] = useState(item.isLiked);
  const { IconFilled, IconRegular } = IconAnimation(trigger);
  const dispatch = useAppDispatch();

  const handleLike = useCallback(async () => {
    setTrigger((prev) => {
      const next = !prev;
      try {
        dispatch(
          updateLike({
            postId: item.postId,
            isLiked: next
          } as Post)
        );
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  }, [dispatch, item.postId]);
  return (
    <TouchableOpacity activeOpacity={1} onPress={handleLike}>
      <Animated.View style={IconRegular}>
        <MaterialCommunityIcons name="heart-outline" size={ICON_SIZE_LG} color="black" />
      </Animated.View>
      <Animated.View style={[IconFilled, styles.absolute]}>
        <MaterialCommunityIcons
          name="heart"
          size={ICON_SIZE_LG}
          color={Colors.heart}
        />
      </Animated.View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  absolute: {
    position: "absolute"
  }
});

export default LikeButtonAnimated;
