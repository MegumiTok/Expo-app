import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AntDesign from "react-native-vector-icons/AntDesign";
//pages

import { LoadingView } from "@components/styles/LoadingView";
import ErrorPage from "@components/ErrorPage";
import GenreList from "@pages/searchPage/GenreList";
import SearchList from "@components/SearchList";
import FavList from "@pages/searchPage/FavList";
//redux==============================
import { useAppSelector } from "@Redux/hook";

//Searchページ内のTopタブ
const Tab = createMaterialTopTabNavigator();

export const SearchNavigator = () => {
  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  let content;
  if (postStatus === "loading") {
    content = <LoadingView />;
  } else if (postStatus === "succeeded") {
    content = (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIndicatorStyle: {
            backgroundColor: "black", //Indicatorの色
            height: 1.5
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "genre") {
              iconName = focused ? "slack-square" : "slack";
              size = 20;
            } else if (route.name === "favorite") {
              iconName = focused ? "heart" : "hearto";
              size = 20;
            } else if (route.name === "product") {
              iconName = "skin";
              size = 20;
            }

            // You can return any component that you like here!
            return <AntDesign name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray"
        })}
      >
        <Tab.Screen name="genre" component={GenreList} />
        <Tab.Screen name="favorite" component={FavList} />
        <Tab.Screen name="product" component={SearchList} />
      </Tab.Navigator>
    );
  } else if (postStatus === "failed") {
    content = <ErrorPage error={error} />;
  }
  return <>{content}</>;
};
