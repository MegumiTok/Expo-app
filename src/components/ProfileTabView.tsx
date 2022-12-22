import { StyleSheet, View } from "react-native";
import type { FC } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//style----------------------------------------------
import {
  SCREEN_WIDTH,
  SPACING_SQUARE,
  SPACING_SQUARE_SIZE,
  SPACING
} from "@components/styles/theme/layout";
import { STATUS_BAR_HEIGHT } from "../config/const";
//pages---------------------------------------------------
import Products from "@pages/Products";
import Posts from "@pages/Posts";

//type-----------------------------------------------------------
import type { Post } from "@models/PostTypes";

interface TabViewProps {
  topHeight: number;
  posts: Post[];
}
export const ProfileTabView: FC<TabViewProps> = ({ topHeight, posts }) => {
  // console.log("topHeightの高さだよ", topHeight);
  const Tab = createMaterialTopTabNavigator();
  const TOP_SIZE = topHeight;
  // const TOP_HEADER_HEIGHT = SCREEN_WIDTH * 0.21 + SPACING + TOP_SIZE;
  const TOP_HEADER_HEIGHT = SPACING + TOP_SIZE + STATUS_BAR_HEIGHT;
  //🟠TOP_HEADER_HEIGHTをアニメーションでスクロールしたら０にするようにすればいいのかな、

  // const squares = [];
  // const numberOfSquare = 21;

  const illustrations = posts.filter((post) => post.product === false);
  const products = posts.filter((post) => post.product === true);

  // for (let index = 0; index < numberOfSquare; index++) {
  //   squares.push(
  //     <View key={index}>
  //       <View
  //         style={{
  //           width: SPACING_SQUARE_SIZE,
  //           height: SPACING_SQUARE_SIZE,
  //           marginVertical: SPACING_SQUARE,
  //           backgroundColor: "black",
  //           opacity: 0.1,
  //         }}
  //       />
  //     </View>
  //   );
  // }

  return (
    <View //LOWER PART
      style={[
        StyleSheet.absoluteFillObject,
        { top: TOP_HEADER_HEIGHT, padding: SPACING } //🟢
      ]}
    >
      <Tab.Navigator
        screenOptions={() => ({
          tabBarIndicatorStyle: {
            backgroundColor: "black", //Indicatorの色
            height: 1.5
          }
        })}
      >
        <Tab.Screen
          name="イラスト"
          // component={PostNavigator}
          component={Posts}
          initialParams={{ illustrations }}
        />
        <Tab.Screen
          name="グッズ"
          component={Products}
          initialParams={{ products }}
        />
        {/* <Tab.Screen name="つぶやき" component={CommentPage}  /> */}
      </Tab.Navigator>
    </View>
  );
};

export default ProfileTabView;
