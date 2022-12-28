import { Text } from "native-base";
import { View, StyleSheet } from "react-native";
// import { parseISO, formatDistanceToNow } from "date-fns";
//styles----------------------------
import type { Post } from "@models/PostTypes";

// import type { FeedProps } from "@models/NavTypes";

// import { ReactionButtons } from "@components/templates/ReactionButtons";
import LikeButtonAnimated from "./LikeButtonAnimated";
import { _timeAgo } from "@functions/_timeAgo";
//compsーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
import ReadContinue from "./ReadContinue";

export const FeedPostFooter = ({ item }: { item: Post }) => {
  // let timeAgo = "";
  // const timestamp = item.updatedAt || item.postedAt;
  // const updatedAt = item.updatedAt;
  const postedAt = item.postedAt;
  // if (updatedAt) {
  //   console.log("updatedAt:", updatedAt);
  //   const date = parseISO(updatedAt);
  //   const timePeriod = formatDistanceToNow(date);
  //   timeAgo = `updated ${timePeriod} ago`;
  // } else {
  //   console.log("postedAt:", postedAt);
  //   const date = parseISO(postedAt);
  //   const timePeriod = formatDistanceToNow(date);
  //   timeAgo = ` ${timePeriod} ago`;
  // }

  const timeAgo = _timeAgo(postedAt);

  // timeAgo = ` ${item.postedAt} ago`;
  return (
    <>
      <View style={styles.containerMain}>
        <View>
          <Text fontSize="xs">{timeAgo}</Text>
        </View>
        <View style={styles.containerLike}>
          <LikeButtonAnimated item={item} />
          {/* <ReactionButtons item={item} /> */}
        </View>

        {/* <SavedButtonAnimated /> */}
      </View>
      <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
        <ReadContinue comment={item.comment} />
      </View>
    </>
  );
};

export default FeedPostFooter;

const styles = StyleSheet.create({
  containerLike: {
    // flexDirection: "row",
    // width: SCREEN_WIDTH,
  },
  containerMain: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    paddingHorizontal: 5
  }
});
