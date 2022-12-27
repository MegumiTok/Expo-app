import { useNavigation } from "@react-navigation/native";
import { Text, View, FlatList, StyleSheet, Pressable } from "react-native";

import { Routes } from "@models/NavTypes";
import type { EventType } from "@models/EventType";

const ItemSeparatorView = () => {
  return (
    <View style={{ height: 0.5, width: "100%", backgroundColor: "#c8c8c8" }} />
  );
};
export const EventList = ({ items }) => {
  const { navigate } = useNavigation();

  const _renderItem = ({ item }: { item: EventType }) => {
    // const { eventId } = item;
    return (
      <Pressable
        style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
        onPress={() => {
          // setOpacity(0);
          navigate(Routes.EventSinglePost, { item });
        }}
      >
        <View style={styles.box}>
          <View style={styles.textWrapper}>
            <Text style={styles.title}>{item.postedDate}</Text>
            <Text style={styles.date}>{item.title}</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={_renderItem}
        ItemSeparatorComponent={ItemSeparatorView}
      />
    </View>
  );
};

export default EventList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  box: {
    height: 120,
    width: "100%",
    flexDirection: "row"
  },
  textWrapper: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 16,
    justifyContent: "space-between",
    // borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 1,
    shadowRadius: 1
  },

  date: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20
  },
  title: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 12
  }
});
