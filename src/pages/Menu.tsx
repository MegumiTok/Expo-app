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
import { Colors } from "@components/styles/theme/Colors";
import {
  SEPARATOR_HEIGHT,
  FONT_SIZE_XL,
  SPACING_BIG,
  ICON_SIZE_MD,
  BORDER_RADIUS_MD
} from "@components/styles/theme/layout";

const ItemSeparatorView = () => {
  return (
    <View
      style={{
        height: SEPARATOR_HEIGHT,
        width: "100%",
        backgroundColor: Colors.separator
      }}
    />
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
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => props.navigation.push(item.name)}
              >
                <View style={styles.wrapper}>
                  <Feather name={item.icon} size={ICON_SIZE_MD} />
                  <Text style={{ fontSize: FONT_SIZE_XL }}>
                    {item.label}
                  </Text>

                  <Feather name="chevron-right" size={ICON_SIZE_MD} />
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
    borderRadius: BORDER_RADIUS_MD
  },
  wrapper: {
    padding: SPACING_BIG,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
