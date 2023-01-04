import { StyleSheet, View } from "react-native";
import type { FC } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import FontAwesome from "react-native-vector-icons/FontAwesome";
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
  // console.log("topHeightの高さです", topHeight);
  const Tab = createMaterialTopTabNavigator();
  const TOP_SIZE = topHeight;
  // const TOP_HEADER_HEIGHT = SCREEN_WIDTH * 0.21 + SPACING + TOP_SIZE;
  // const TOP_HEADER_HEIGHT = SPACING + TOP_SIZE + STATUS_BAR_HEIGHT;
  const TOP_HEADER_HEIGHT = TOP_SIZE;

  const illustrations = posts.filter((post) => post.product === false);
  const products = posts.filter((post) => post.product === true);

  return (
    <View //LOWER PART
      style={[
        StyleSheet.absoluteFillObject,
        { top: TOP_HEADER_HEIGHT } //🟢
      ]}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIndicatorStyle: {
            backgroundColor: "black", //Indicatorの色
            height: 1.5
          }
        })}
      >
        <Tab.Screen
          name="photos"
          // component={PostNavigator}
          component={Posts}
          initialParams={{ illustrations }}
          options={
            {
              // tabBarLabel: "",
              // tabBarIcon: ({ color }) => (
              //   <FontAwesome name="photo" color={color} size={20} />
              // )
            }
          }
        />
        <Tab.Screen
          name="products"
          component={Products}
          initialParams={{ products }}
        />
        {/* <Tab.Screen name="つぶやき" component={CommentPage}  /> */}
      </Tab.Navigator>
    </View>
  );
};

export default ProfileTabView;
