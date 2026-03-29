import { View, Image } from "native-base";
import { FlatList } from "react-native";
import {
  SPACING_SQUARE,
  SPACING_SQUARE_SIZE
} from "@components/styles/theme/layout";

import type { Post } from "@models/PostTypes";

interface ImageThumbnailGridProps {
  data: Post[];
  resizeMode?: "cover" | "contain";
}

const ThumbnailItem = ({
  item,
  resizeMode
}: {
  item: Post;
  resizeMode: "cover" | "contain";
}) => (
  <View>
    <Image
      style={{
        width: SPACING_SQUARE_SIZE,
        height: SPACING_SQUARE_SIZE,
        margin: SPACING_SQUARE
      }}
      source={{ uri: item.postedImage }}
      resizeMode={resizeMode}
      alt="post"
    />
  </View>
);

export const ImageThumbnailGrid = ({
  data,
  resizeMode = "cover"
}: ImageThumbnailGridProps) => {
  const _renderItem = ({ item }: { item: Post }) => (
    <ThumbnailItem item={item} resizeMode={resizeMode} />
  );

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={_renderItem}
        numColumns={2}
      />
    </View>
  );
};

export default ImageThumbnailGrid;
