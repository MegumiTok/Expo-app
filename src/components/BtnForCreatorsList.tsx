import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SPACING } from "./styles/theme/layout";
import { Text, TouchableOpacity } from "react-native";

import { Routes } from "@models/NavTypes";
import { STATUS_BAR_HEIGHT } from "src/config/const";
export const BtnForCreatorsList = () => {
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
        top: STATUS_BAR_HEIGHT + SPACING,
        right: 20,
        zIndex: 2
      }}
      onPress={() => navigation.navigate(Routes.CreatorList)}
    >
      <Text style={{ fontSize: 15 }}>Other Creators</Text>
    </TouchableOpacity>
  );
};

export default BtnForCreatorsList;
