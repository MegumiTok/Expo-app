import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import { Text, TouchableOpacity } from "react-native";

export const GoBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "rgba(255,255,255,0.8)",
        borderRadius: 100,
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 2
      }}
      onPress={() => {
        // animation(0).start()
        navigation.goBack();
      }}
    >
      <AntDesign
        name="arrowleft"
        style={{ marginRight: 5 }}
        size={22}
        color={"#000"}
      />
      <Text style={{ fontSize: 12 }}>戻る</Text>
    </TouchableOpacity>
  );
};

export default GoBack;
