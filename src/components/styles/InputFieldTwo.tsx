import { View, StyleSheet, TextInput, Text } from "react-native";
//type
import type { FC } from "react";
import { Colors } from "./theme/Colors";
import {
  SPACING_BIG,
  FONT_SIZE_MD,
  INPUT_HEIGHT,
  BORDER_RADIUS_SM
} from "./theme/layout";

interface Props {
  labelValue: string;
  // placeholderText: string;
  title: string;
}

export const InputFieldTwo: FC<Props> = ({
  labelValue,
  // placeholderText,
  title,
  ...rest
}) => {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.bar} />
        <Text>{title}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={labelValue}
          // placeholder={placeholderText}
          placeholderTextColor={Colors.textMuted}
          numberOfLines={1}
          textAlign="center"
          {...rest}
        />
      </View>
    </>
  );
};

export default InputFieldTwo;

const styles = StyleSheet.create({
  input: {
    color: Colors.textSub,
    flex: 1,
    fontFamily: "NotoSansJP-Medium",
    fontSize: FONT_SIZE_MD,
    padding: SPACING_BIG
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderColor: Colors.border,
    borderRadius: BORDER_RADIUS_SM,
    borderWidth: 1,
    flexDirection: "row",
    height: INPUT_HEIGHT,
    marginBottom: SPACING_BIG,
    marginTop: 5,
    width: "100%"
  },

  header: {
    flexDirection: "row",
    alignSelf: "flex-start"
  },
  bar: {
    marginRight: 5,
    height: 20,
    width: 5,
    backgroundColor: Colors.border
  }
});
