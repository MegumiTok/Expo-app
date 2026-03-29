import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Pressable,
  ImageBackground,
  RefreshControl
} from "react-native";

import { Routes } from "@models/NavTypes";
import type { EventType } from "@models/EventType";
import { _day } from "@functions/_day";
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "@components/styles/theme/Colors";
import {
  SPACING_BIG,
  FONT_SIZE_XS,
  FONT_SIZE_LG,
  EVENT_CARD_HEIGHT,
  SEPARATOR_HEIGHT,
  ICON_SIZE_MD
} from "@components/styles/theme/layout";
//redux==============================
import { useAppDispatch } from "@Redux/hook";
import { fetchAllEvents } from "@Redux/eventActions";

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
export const EventList = ({ items, bg }) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useAppDispatch();

  const _onRefresh = () => {
    setRefreshing(true);

    dispatch(fetchAllEvents());
    setRefreshing(false);
  };
  const { navigate } = useNavigation();

  const _renderItem = ({ item }: { item: EventType }) => {
    const day = _day(item.postedDate);

    return (
      <Pressable
        style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
        onPress={() => {
          navigate(Routes.EventSinglePost, { item });
        }}
      >
        <View
          style={{
            height: EVENT_CARD_HEIGHT,
            backgroundColor: Colors.eventCardBackground,
            padding: SPACING_BIG
          }}
        >
          <Text style={styles.date}>{day}</Text>
          <View style={styles.box}>
            <View style={styles.textWrapper}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <Feather name="chevron-right" size={ICON_SIZE_MD} />
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
          refreshing={refreshing}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
          }
        />
      </ImageBackground>
    </View>
  );
};

export default EventList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
  },
  textWrapper: {
    width: "80%"
  },

  date: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: FONT_SIZE_XS,
    marginBottom: SPACING
  },
  title: {
    fontWeight: "bold",
    fontSize: FONT_SIZE_LG
  }
});
