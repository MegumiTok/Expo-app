import { FlatList } from "react-native";
import PostsThumbnail from "@components/PostsThumbnail";
import type { FC } from "react";
import type { Post } from "@models/PostTypes";

export const Posts = ({ route }) => {
  const { illustrations } = route.params;
  const _renderItem = ({ item }: { item: Post }) => {
    return <PostsThumbnail post={item} key={item.postId} />;
  };

  return (
    <FlatList
      data={illustrations}
      decelerationRate="fast"
      contentContainerStyle={{ justifyContent: "space-evenly" }}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      renderItem={_renderItem}
      keyExtractor={(item) => item.postId}
    />
  );
};

export default Posts;
