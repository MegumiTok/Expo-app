import { useCallback, useState } from "react";
import { View, Text } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { SCREEN_WIDTH } from "@components/styles/theme/layout";
import { Colors } from "@components/styles/theme/Colors";

interface Type {
  id: number;
  name: string;
}
export const DropDownPicker = ({
  data,
  value,
  onSelect
}: {
  data: Type[];
  value: any;
  onSelect: (value: any) => void;
}) => {
  const [showOption, setShowOption] = useState(false);

  const _onPress = useCallback(
    (i: any) => {
      setShowOption(false);

      onSelect(i);
    },
    [onSelect, value?.name]
  );

  // console.log(value?.name);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.box}
        activeOpacity={0.8}
        onPress={() => setShowOption(!showOption)}
      >
        <Text style={styles.text}>
          {/* {value ? value.name : "Chose an options"} */}
          {value ? value?.name : "Chose an genre"}
        </Text>
        <View
          style={{
            transform: [{ rotate: showOption ? "180deg" : "0deg" }],
            position: "absolute",
            right: 10
          }}
        >
          <Feather name="chevron-down" size={27} color={Colors.border} />
        </View>
      </TouchableOpacity>
      {showOption && (
        <View style={styles.dropDown}>
          {data.map((val, i) => {
            return (
              <TouchableOpacity
                key={String(i)}
                onPress={() => _onPress(val)}
                style={{
                  width: SCREEN_WIDTH * 0.6,
                  backgroundColor: value?.id === val.id ? "pink" : "white",
                  padding: 5
                }}
              >
                <Text>{val.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default DropDownPicker;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: "center"
  },
  box: {
    borderColor: Colors.border,
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
    minHeight: 42,
    // justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: SCREEN_WIDTH * 0.6,
    backgroundColor: "white"
  },
  text: {
    color: Colors.text,
    fontSize: 15
  },
  dropDown: {
    alignSelf: "flex-start"
  }
});
