import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
export const basicStyles = StyleSheet.create({
  basicText: {
    fontFamily: "NotoSansJP-Medium"
  },
  button: {
    backgroundColor: Colors.secondary.general,
    borderRadius: 10,
    padding: 10
  },
  container: {
    backgroundColor: "#FFF",
    flex: 1
  },
  input: {
    backgroundColor: "white",
    height: 50,
    padding: 10,
    width: "100%"
  },
  warningText: {
    color: "red",
    fontSize: 12,
    fontWeight: "bold"
  }
});

export default basicStyles;
