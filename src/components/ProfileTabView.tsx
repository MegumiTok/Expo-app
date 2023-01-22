import { StyleSheet, View } from "react-native";
import type { FC } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//pages---------------------------------------------------
import PostsThumbnail from "./PostsThumbnail";
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
        screenOptions={() => ({
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
      </Tab.Navigator>
    </View>
  );
};

const Posts = ({ route }) => {
  const { illustrations } = route.params;
  return <PostsThumbnail items={illustrations} />;
};

const Products = ({ route }) => {
  const { products } = route.params;
  return <PostsThumbnail items={products} />;
};

export default ProfileTabView;
