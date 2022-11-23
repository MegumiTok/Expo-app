import StyledPressable from "./StyledPressable";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../theme/Colors";
import { useNavigation } from "@react-navigation/native";
export const CloseButton = () => {
  const navigation = useNavigation();
  return (
    <StyledPressable
      onPress={() => navigation.goBack()}
      style={({ pressed }) => ({ opacity: pressed ? 0.2 : 1 })}
      //   position="absolute"//これを設定すると押せなくなる
      top={1}
      left={2}
      width={50}
      height={50}
      backgroundColor={Colors.primary.light}
      borderRadius={30}
      justifyContent="center"
      alignItems="center"
      //   borderWidth={0.5}
      //   borderColor={Colors.pink.light}
    >
      <AntDesign name="close" size={30} color="white" />
    </StyledPressable>
  );
};

export default CloseButton;
