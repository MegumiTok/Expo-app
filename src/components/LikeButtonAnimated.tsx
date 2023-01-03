import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Animated from "react-native-reanimated";
import iconAnimation from "./iconAnimation";
import { AuthContext } from "@navigation/AuthProvider";
import { useAppDispatch } from "@Redux/hook";
import { updateLike } from "@Redux/postActions";
// import { updateLike } from "@Redux/postsSlice";

import type { Post } from "@models/PostTypes";
const LikeButtonAnimated = ({ item }: { item: Post }) => {
  const [trigger, setTrigger] = useState(item.isLiked);
  const { IconFilled, IconRegular } = iconAnimation(trigger);
  const dispatch = useAppDispatch();
  const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   const update = async () => {
  //     try {
  //       dispatch(
  //         updateLike({
  //           postId: item.postId,
  //           isLiked: trigger
  //         } as Post)
  //       );
  //     } catch (e) {
  //       // Alert.alert("fetchPostsに失敗しました。");
  //       console.error("エラー:", e);
  //     }
  //   };

  //   update();
  // }, [dispatch, item.postId, trigger]);

  const handleLike = async () => {
    setTrigger(!trigger);
    if (user?.uid !== item.creatorId)
      try {
        console.log("likeが押された");

        dispatch(
          updateLike({
            postId: item.postId,
            isLiked: !trigger
          } as Post)
        );
      } catch (e) {
        console.error(e);
      }
  };
  return (
    // <TouchableOpacity activeOpacity={1} onPress={() => setTrigger(!trigger)}>
    <TouchableOpacity activeOpacity={1} onPress={handleLike}>
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
