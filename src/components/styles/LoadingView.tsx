import { View } from "native-base";
import { ActivityIndicator } from "react-native";

export const LoadingView = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
};
