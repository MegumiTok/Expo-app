import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Center, View } from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export const OutlineButton = ({
  onPress,
  title,
  name,
  color,
  ...rest
}: {
  onPress: () => void;
  title: string;
  disabled?: any;
  name?: string;
  color?: string;
}) => {
  return (
    <Center>
      <TouchableOpacity
        style={[styles.userBtn, { borderColor: color ? color : "#2e64e5" }]}
        onPress={onPress}
        {...rest}
      >
        <View paddingRight={1}>
          {name && (
            <FontAwesome5
              name={name}
              size={15}
              color={color ? color : "#2e64e5"}
            />
          )}
        </View>
        <Text style={[styles.userBtnTxt, { color: color ? color : "#2e64e5" }]}>
          {title}
        </Text>
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
    width: "70%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  userBtnTxt: {
    color: "#2e64e5"
  }
});
