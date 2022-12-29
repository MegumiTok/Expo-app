import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Pressable,
  ImageBackground
} from "react-native";

import { Routes } from "@models/NavTypes";
import type { EventType } from "@models/EventType";
import { _day } from "@functions/_day";
import Feather from "react-native-vector-icons/Feather";
import { position } from "styled-system";
const ItemSeparatorView = () => {
  return (
    <View style={{ height: 0.9, width: "100%", backgroundColor: "#c8c8c8" }} />
  );
};
export const EventList = ({ items, bg }) => {
  const { navigate } = useNavigation();
  const image = { uri: "https://reactjs.org/logo-og.png" };
  const _renderItem = ({ item }: { item: EventType }) => {
    // const { eventId } = item;
    const day = _day(item.postedDate);

    // console.log("時間です:", day);
    return (
      <Pressable
        style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
        onPress={() => {
          // setOpacity(0);
          navigate(Routes.EventSinglePost, { item });
        }}
      >
        <View
          style={{
            height: 140,

            backgroundColor: "#FFFFFF95",
            padding: 10
          }}
        >
          <Text style={styles.date}>{day}</Text>
          <View style={styles.box}>
            <View style={styles.textWrapper}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <Feather name="chevron-right" size={27} />
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={bg}
        // source={image}
        resizeMode="cover"
        imageStyle={{ opacity: 0.5 }}
      >
        <FlatList
          data={items}
          keyExtractor={(_, index) => index.toString()}
          renderItem={_renderItem}
          ItemSeparatorComponent={ItemSeparatorView}
        />
      </ImageBackground>
    </View>
  );
};

export default EventList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#FFF"
  },
  image: {
    flex: 1,
    justifyContent: "center"
    // opacity: 0.6
  },
  box: {
    // height: 140,
    // width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
    // backgroundColor: "#FFFFFF95",
    // padding: 10
  },
  textWrapper: {
    width: "80%"
  },

  date: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 12,
    marginBottom: 5
  },
  title: {
    fontWeight: "bold",
    fontSize: 20
    // justifyContent: "center",
    // alignItems: "center"
  }
});
