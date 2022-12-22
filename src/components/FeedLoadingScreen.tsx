import SkeletonPlaceholder from "./SkeletonPlaceholder";
import { SCREEN_WIDTH } from "./styles/theme/layout";
import { View } from "react-native";

const FeedLoadingScreen = () => {
  return (
    <SkeletonPlaceholder>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            marginLeft: 10,
            marginTop: 10
          }}
        />
        <View style={{ marginLeft: 20 }}>
          <View style={{ width: 50, height: 20, borderRadius: 4 }} />
          <View
            style={{
              marginTop: 6,
              width: 90,
              height: 20,
              borderRadius: 4
            }}
          />
        </View>
      </View>
      <View style={{ marginTop: 10, marginBottom: 30 }}>
        <View
          style={{
            marginTop: 6,
            width: SCREEN_WIDTH,
            height: SCREEN_WIDTH,
            borderRadius: 4
          }}
        />
        {/* <View
          style={{ width: 300, height: 20, borderRadius: 4, marginTop: 20 }}
        /> */}
      </View>
    </SkeletonPlaceholder>
  );
};

export default FeedLoadingScreen;
