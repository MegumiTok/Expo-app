import { View, StyleSheet, TextInput } from "react-native";
//type
import type { FC } from "react";
import { AntDesign } from "@expo/vector-icons";

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
        <AntDesign name={iconType} size={25} color="#666" />
      </View>
      <TextInput
        style={styles.input}
        value={labelValue}
        placeholder={placeholderText}
        placeholderTextColor="#666"
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
    borderRightColor: "#ccc",
    borderRightWidth: 1,
    height: "100%",
    justifyContent: "center",
    padding: 10,
    width: 50
  },
  input: {
    alignItems: "center",
    color: "#333",
    flex: 1,
    fontFamily: "NotoSansJP-Medium",
    fontSize: 16,
    justifyContent: "center",
    padding: 10
  },
  inputContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: "row",
    height: 48,
    marginBottom: 10,
    marginTop: 5,
    width: "100%"
  }
});
