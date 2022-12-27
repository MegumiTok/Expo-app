import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useEffect } from "react";
import { Alert } from "react-native";
//pages
import {
  AllEventList,
  EventList1,
  EventList2,
  EventList3
} from "@pages/eventPage";

import { LoadingView } from "@components/styles/LoadingView";
import ErrorPage from "@components/ErrorPage";
//redux==============================
import { useAppDispatch, useAppSelector } from "@Redux/hook";
import { fetchAllEvents } from "@Redux/eventActions";
import { selectAllEvents, selectEventByCategory } from "@Redux/eventSlice";

//Eventページ内のTopタブ
const Tab = createMaterialTopTabNavigator();

export const EventNavigator = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectAllEvents);
  const eventStatus = useAppSelector((state) => state.events.status);
  const error = useAppSelector((state) => state.posts.error);

  const category1 = useAppSelector((state) =>
    selectEventByCategory(state, "Pokémon")
  );
  const category2 = useAppSelector((state) =>
    selectEventByCategory(state, "Hunter × Hunter")
  );
  const category3 = useAppSelector((state) =>
    selectEventByCategory(state, "Attack on Titan")
  );

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

  let content;
  if (eventStatus === "loading") {
    content = <LoadingView />;
  } else if (eventStatus === "succeeded") {
    content = (
      <Tab.Navigator
        screenOptions={() => ({
          tabBarIndicatorStyle: {
            backgroundColor: "black", //Indicatorの色
            height: 1.5
          }
        })}
      >
        <Tab.Screen
          name="All"
          component={AllEventList}
          initialParams={{ events }}
        />
        <Tab.Screen
          name="Pokémon"
          component={EventList1}
          initialParams={{ category1 }}
        />
        <Tab.Screen
          name="Hunter × Hunter"
          component={EventList2}
          initialParams={{ category2 }}
        />
        <Tab.Screen
          name="Attack on Titan"
          component={EventList3}
          initialParams={{ category3 }}
        />
      </Tab.Navigator>
    );
  } else if (eventStatus === "failed") {
    content = <ErrorPage error={error} />;
  }
  return <>{content}</>;

  // return (
  //   <Tab.Navigator
  //     screenOptions={() => ({
  //       tabBarIndicatorStyle: {
  //         backgroundColor: "black", //Indicatorの色
  //         height: 1.5
  //       }
  //     })}
  //   >
  //     <Tab.Screen name="全体" component={AllEventList} />
  //     <Tab.Screen name="お知らせ1" component={EventList1} />
  //     <Tab.Screen name="お知らせ2" component={EventList2} />
  //     <Tab.Screen name="お知らせ3" component={EventList3} />
  //   </Tab.Navigator>
  // );
};
