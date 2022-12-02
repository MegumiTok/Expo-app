import { View, StyleSheet } from "react-native";

//styles----------------------------
import { SCREEN_WIDTH } from "@components/styles/theme/layout";
// import LikeButtonAnimated from "@assets/Icons/LikeButtonAnimated";
import type { FeedProps } from "@models/NavTypes";

// import { ReactionButtons } from "@components/templates/ReactionButtons";
//compsーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
import ReadContinue from "./ReadContinue";

export const FeedPostFooter = ({ item }: FeedProps) => {
  return (
    <>
      <View style={styles.containerMain}>
        {/* <View style={styles.containerLike}>
          <LikeButtonAnimated />
          <ReactionButtons item={item} />
        </View> */}
        <View style={{ flexDirection: "row" }} />
        {/* <SavedButtonAnimated /> */}
      </View>
      <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
        <ReadContinue section={item} />
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
