import { View, StyleSheet, TextInput } from "react-native";
//type
import type { FC } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "./theme/Colors";
import {
  SPACING_BIG,
  FONT_SIZE_MD,
  INPUT_HEIGHT,
  BORDER_RADIUS_SM,
  ICON_SIZE_SM
} from "./theme/layout";

interface Props {
  labelValue: string;
  placeholderText: string;
  iconType: any;
}

export const InputField: FC<Props> = ({
  labelValue,
  placeholderText,
  iconType,
  ...rest
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconStyle}>
        <AntDesign name={iconType} size={ICON_SIZE_SM} color={Colors.textMuted} />
      </View>
      <TextInput
        style={styles.input}
        value={labelValue}
        placeholder={placeholderText}
        placeholderTextColor={Colors.textMuted}
        numberOfLines={1}
        {...rest}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  iconStyle: {
    alignItems: "center",
    borderRightColor: Colors.border,
    borderRightWidth: 1,
    height: "100%",
    justifyContent: "center",
    padding: SPACING_BIG,
    width: 50
  },
  input: {
    alignItems: "center",
    color: Colors.textSub,
    flex: 1,
    fontFamily: "NotoSansJP-Medium",
    fontSize: FONT_SIZE_MD,
    justifyContent: "center",
    padding: SPACING_BIG
  },
  inputContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: Colors.border,
    borderRadius: BORDER_RADIUS_SM,
    borderWidth: 1,
    flexDirection: "row",
    height: INPUT_HEIGHT,
    marginBottom: SPACING_BIG,
    marginTop: 5,
    width: "100%"
  }
});
