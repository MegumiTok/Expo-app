import { TouchableOpacity, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

// import { fonts } from "@components/styles/theme";
import MenuList from "@assets/data/MenuList";

export const Menu = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={MenuList}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ flex: 1, justifyContent: "space-evenly" }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => props.navigation.push(item.name)}
              style={{ padding: 10 }}
            >
              <Text style={{ fontSize: 24 }}>
                {index + 1}.{item.label}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Menu;
