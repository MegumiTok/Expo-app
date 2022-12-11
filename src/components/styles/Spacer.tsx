import { View, StyleSheet } from "react-native";
import { SPACING } from "./theme/layout";
export const Spacer = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING
  }
});

export default Spacer;
