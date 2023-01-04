//PostsのrenderItemに当たる部分
import type { FC } from "react";
import { useState } from "react";
import { Pressable, Image, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Routes } from "@models/NavTypes";
//style-------------------------------------------------
import {
  SPACING_SQUARE,
  SPACING_SQUARE_SIZE
} from "@components/styles/theme/layout";

//type------------------------------------------------
import type { Post } from "@models/PostTypes";

interface Props {
  post: Post;
}
export const PostsThumbnail: FC<Props> = ({ post }) => {
  const { postId } = post;
  // console.log("2postId: ", postId);
  const navigation = useNavigation();
  const [opacity, setOpacity] = useState(1);
  useFocusEffect(() => {
    //
    if (navigation.isFocused()) {
      setOpacity(1);
    }
  });
  return (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      onPress={() => {
        setOpacity(0);
        navigation.navigate(Routes.SinglePost, { postId });
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          justifyContent: "space-between",
          opacity
        }}
      >
        <Image
          source={{
            uri: post.postedImage
          }}
          style={{
            resizeMode: "cover",
            width: SPACING_SQUARE_SIZE,
            height: SPACING_SQUARE_SIZE,
            margin: SPACING_SQUARE,
            backgroundColor: "white"
          }}
        />

        {/* <Text //これは要らないかも。デザイン的に見栄えが良くない
          style={{
            fontSize: 12,
            color: "white",
            fontFamily: "NotoSansJP-Regular",
            textAlign: "center",
            overflow: "hidden",
            position: "absolute",
            top: SPACING,
            right: SPACING,
            // borderRadius: 16,
            // borderTopRightRadius: 10,
            backgroundColor: "#f472b690",
            padding: 2,
            paddingRight: 8,
          }}
        >
          {postDetail.genre}
        </Text> */}
      </View>
    </Pressable>
  );
};

export default PostsThumbnail;
