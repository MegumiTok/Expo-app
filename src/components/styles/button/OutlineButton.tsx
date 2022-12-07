import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Center } from "native-base";

export const OutlineButton = ({
  onPress,
  title,

  ...rest
}: {
  onPress: () => void;
  title: string;
  disabled?: any;
}) => {
  return (
    <Center>
      <TouchableOpacity style={styles.userBtn} onPress={onPress} {...rest}>
        <Text style={styles.userBtnTxt}> {title}</Text>
      </TouchableOpacity>
    </Center>
  );
};

const styles = StyleSheet.create({
  userBtn: {
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    width: "70%"
  },
  userBtnTxt: {
    color: "#2e64e5",
    justifyContent: "center",
    alignSelf: "center"
  }
});
