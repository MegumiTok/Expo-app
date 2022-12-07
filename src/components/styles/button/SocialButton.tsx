import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const SocialButton = ({
  buttonTitle,
  btnType,
  color,
  backgroundColor,
  ...rest
}) => {
  const bgColor = backgroundColor;
  return (
    <TouchableOpacity
      {...rest}
      style={[styles.buttonContainer, { backgroundColor: bgColor }]}
    >
      <View style={styles.iconWrapper}>
        <FontAwesome
          name={btnType}
          style={styles.icon}
          size={22}
          color={color}
        />
      </View>
      <View style={styles.btnTxtWrapper}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  btnTxtWrapper: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  buttonContainer: {
    borderRadius: 3,
    flexDirection: "row",
    height: 48,
    marginTop: 10,
    padding: 10,
    width: "100%"
  },
  buttonText: {
    fontFamily: "NotoSansJP-Regular",
    fontSize: 18,
    fontWeight: "bold"
  },
  icon: {
    fontWeight: "bold"
  },
  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 30
  }
});
