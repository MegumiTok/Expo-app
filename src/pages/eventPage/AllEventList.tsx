//イベント全体
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Pressable,
  Alert
} from "react-native";

import { Routes } from "@models/NavTypes";
import type { EventType } from "@models/EventType";
// ローカルデータ=======================
// import { events } from "@assets/data/events";

//redux==============================
import { useAppDispatch, useAppSelector } from "@Redux/hook";
import { fetchAllEvents } from "@Redux/eventActions";
import { selectAllEvents } from "@Redux/eventSlice";

export const AllEventList = () => {
  const { navigate } = useNavigation();
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectAllEvents);
  const eventStatus = useAppSelector((state) => state.events.status);
  const error = useAppSelector((state) => state.posts.error);

  // const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(fetchAllEvents());
      } catch (e) {
        Alert.alert("fetchAllEventsに失敗しました。");
        console.log("エラー:", e);
      }
    };

    fetch();
  }, [dispatch]);

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
        data={events}
        keyExtractor={(item, index) => index.toString()}
        renderItem={_renderItem}
      />
    </View>
  );
};

export default AllEventList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  box: {
    height: 120,
    width: "100%",
    borderColor: "rgba(255,255,255,0.3)",
    borderWidth: 5,
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
