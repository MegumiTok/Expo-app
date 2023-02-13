import { FlatList, Pressable, Image, View } from "react-native";
// import PostsThumbnail from "@components/PostsThumbnail";

// import type { FC } from "react";
import { useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Routes } from "@models/NavTypes";
//style-------------------------------------------------
import {
  SPACING_SQUARE,
  SPACING_SQUARE_SIZE
} from "@components/styles/theme/layout";
//type------------------------------------------------
import type { Post } from "@models/PostTypes";

export const PostsThumbnail = ({ items }) => {
  const navigation = useNavigation();
  const [opacity, setOpacity] = useState(1);
  useFocusEffect(() => {
    //
    if (navigation.isFocused()) {
      setOpacity(1);
    }
  });
  const _renderItem = ({ item }: { item: Post }) => {
    // return <PostsThumbnail post={item} key={item.postId} />;
    const postId = item.postId;
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
              uri: item.postedImage
            }}
            style={{
              resizeMode: "cover",
              width: SPACING_SQUARE_SIZE,
              height: SPACING_SQUARE_SIZE,
              margin: SPACING_SQUARE,
              backgroundColor: "white"
            }}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={items}
      decelerationRate="fast"
      contentContainerStyle={{ justifyContent: "space-evenly" }}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      renderItem={_renderItem}
      keyExtractor={(item) => item.postId}
      getItemLayout={(data, index) => ({
        //ここの部分のベストプラクティスが不明
        length: SPACING_SQUARE_SIZE + SPACING_SQUARE * 2,
        offset: (SPACING_SQUARE_SIZE * index) / 2,
        index
      })}
    />
  );
};

export default PostsThumbnail;
