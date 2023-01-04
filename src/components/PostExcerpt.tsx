import { FlatList } from "react-native";
import PostsThumbnail from "@components/PostsThumbnail";

import type { Post } from "@models/PostTypes";

export const PostExcerpt = ({ items }) => {
  const _renderItem = ({ item }: { item: Post }) => {
    return <PostsThumbnail post={item} key={item.postId} />;
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
    />
  );
};

export default PostExcerpt;
