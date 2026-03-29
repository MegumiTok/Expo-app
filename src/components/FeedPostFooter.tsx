import { Text } from "native-base";
import { View, StyleSheet } from "react-native";
//styles----------------------------
import type { Post } from "@models/PostTypes";

import LikeButtonAnimated from "./LikeButtonAnimated";
import { _timeAgo } from "@functions/_timeAgo";
//comps
import ReadContinue from "./ReadContinue";

export const FeedPostFooter = ({ item }: { item: Post }) => {
  const postedAt = item.postedAt;
  const timeAgo = _timeAgo(postedAt);

  return (
    <>
      <View style={styles.containerMain}>
        <View>
          <Text fontSize="xs">{timeAgo}</Text>
        </View>
        <View style={styles.containerLike}>
          <LikeButtonAnimated item={item} />
        </View>
      </View>
      <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
        <ReadContinue comment={item.comment} />
      </View>
    </>
  );
};

export default FeedPostFooter;

const styles = StyleSheet.create({
  containerLike: {},
  containerMain: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    paddingHorizontal: 5
  }
});
