import { View, StyleSheet, TextInput, Text } from "react-native";
//type
import type { FC } from "react";

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
          placeholderTextColor="#666"
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
    // alignItems: "center",
    color: "#333",
    flex: 1,
    fontFamily: "NotoSansJP-Medium",
    fontSize: 16,
    // justifyContent: "center",
    padding: 10
  },
  inputContainer: {
    // alignItems: "center",
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: "row",
    height: 48,
    marginBottom: 10,
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
    backgroundColor: "#ccc"
  }
});
