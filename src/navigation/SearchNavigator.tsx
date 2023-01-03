import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useEffect } from "react";
import { Alert } from "react-native";
//pages
import { GenreList, FavList, ProductList } from "@pages/seatchPage/SearchLists";
import { LoadingView } from "@components/styles/LoadingView";
import ErrorPage from "@components/ErrorPage";
//redux==============================
import { useAppDispatch, useAppSelector } from "@Redux/hook";
import { fetchAllEvents } from "@Redux/eventActions";
import { selectAllPosts, selectPostsByGenre } from "@Redux/postsSlice";
//Eventページ内のTopタブ
const Tab = createMaterialTopTabNavigator();

export const SearchNavigator = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  // const category1 = useAppSelector((state) =>
  //   selectPostsByGenre(state, "お絵かき")
  // );
  // const category2 = useAppSelector((state) =>
  //   selectPostByCategory(state, "Hunter × Hunter")
  // );
  // const category3 = useAppSelector((state) =>
  //   selectPostByCategory(state, "Attack on Titan")
  // );

  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       dispatch(fetchAllEvents());
  //     } catch (e) {
  //       Alert.alert("fetchAllEventsに失敗しました。");
  //       console.log("エラー:", e);
  //     }
  //   };

  //   fetch();
  // }, [dispatch]);

  let content;
  if (postStatus === "loading") {
    content = <LoadingView />;
  } else if (postStatus === "succeeded") {
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
          name="genre"
          component={GenreList}
          // initialParams={{ events }}
        />
        <Tab.Screen
          name="favorite"
          component={FavList}
          // initialParams={{ category1 }}
        />
        <Tab.Screen
          name="商品"
          component={ProductList}
          // initialParams={{ category2 }}
        />
      </Tab.Navigator>
    );
  } else if (postStatus === "failed") {
    content = <ErrorPage error={error} />;
  }
  return <>{content}</>;
};
