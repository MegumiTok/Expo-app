import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  FlatList
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Feather from "react-native-vector-icons/Feather";

import MenuList from "@assets/data/MenuList";

const ItemSeparatorView = () => {
  return (
    <View style={{ height: 0.5, width: "100%", backgroundColor: "#c8c8c8" }} />
  );
};
export const Menu = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <FlatList
          data={MenuList}
          keyExtractor={(item) => item.name}
          contentContainerStyle={{ flex: 1, justifyContent: "space-evenly" }}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => props.navigation.push(item.name)}
              >
                <View style={styles.wrapper}>
                  <Feather name={item.icon} size={27} />
                  <Text style={{ fontSize: 24 }}>
                    {/* {index + 1}.{item.label} */}
                    {item.label}
                  </Text>

                  <Feather name="chevron-right" size={27} />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
    // backgroundColor: "#f5e1f1"
  },
  box: {
    width: "95%",
    backgroundColor: "white",
    flex: 1,
    borderRadius: 10
  },
  wrapper: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
