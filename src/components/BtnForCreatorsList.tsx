import { useNavigation } from "@react-navigation/native";
import { SPACING, FONT_SIZE_SM } from "./styles/theme/layout";
import { Text, TouchableOpacity } from "react-native";

import { Routes } from "@models/NavTypes";
import { STATUS_BAR_HEIGHT } from "src/config/const";
import { Colors } from "./styles/theme/Colors";

export const BtnForCreatorsList = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: Colors.buttonBackgroundLight,
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
      <Text style={{ fontSize: FONT_SIZE_SM }}>Other Creators</Text>
    </TouchableOpacity>
  );
};

export default BtnForCreatorsList;
