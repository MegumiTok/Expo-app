import { Center } from "native-base";
import { TextInput } from "react-native";
import Ionic from "react-native-vector-icons/Ionicons";
import { SPACING_BIG } from "./theme/layout";

import type { FC } from "react";

interface Props {
  title: string;
  // onChangeText: () => void;
  onChangeText: any;
  value: string;
}
const SearchBox: FC<Props> = ({ title, onChangeText, value }) => {
  return (
    <Center
      width="100%"
      // paddingY={SPACING_BIG}
      style={{
        position: "relative"
      }}
    >
      <Ionic
        name="search"
        style={{
          fontSize: 21,
          opacity: 0.7,
          position: "absolute",
          zIndex: 1,
          left: 25
        }}
      />
      <TextInput
        placeholder={title}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor="#909090"
        style={{
          width: "94%",
          backgroundColor: "#EBEBEB",
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          fontSize: 17,
          padding: 8,
          paddingLeft: 40
        }}
      />
    </Center>
  );
};

export default SearchBox;
