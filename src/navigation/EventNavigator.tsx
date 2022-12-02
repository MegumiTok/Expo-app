import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//pages
import {
  AllEventList,
  EventList1,
  EventList2,
  EventList3
} from "@pages/eventPage";

//Eventページ内のTopタブ
const Tab = createMaterialTopTabNavigator();

export const EventNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarIndicatorStyle: {
          backgroundColor: "black", //Indicatorの色
          height: 1.5
        }
      })}
    >
      <Tab.Screen name="全体" component={AllEventList} />
      <Tab.Screen name="お知らせ1" component={EventList1} />
      <Tab.Screen name="お知らせ2" component={EventList2} />
      <Tab.Screen name="お知らせ3" component={EventList3} />
    </Tab.Navigator>
  );
};
