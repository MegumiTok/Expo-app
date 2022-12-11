import { Easing, Image, TouchableWithoutFeedback } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { View } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

import Test from "@components/Test";
import { Colors } from "@components/styles/theme/Colors";

//main page---------------------------------------
import { Feed } from "src/pages/Feed";
import { CreatorList } from "src/pages/CreatorList";
import { SearchPage } from "@pages/SearchPage";
import { EventNavigator } from "./EventNavigator";
import Menu from "@pages/Menu";

// sub page---------------------------------------
import { Profile } from "@pages/Profile";
import SinglePostPage from "@pages/SinglePostPage";
import WebShop from "@pages/WebShop";
import AddPostPage from "@pages/AddPostPage";
import EditPostPage from "@pages/EditPostPage";
//data
import MenuList from "@assets/data/MenuList";

// private
import { CreatorListPra } from "@private/CreatorListPra";

//type--------------------------------------
// import type {
//   RootStackParamList,
//   PrivateMenuStackParamList
// } from "@modules/models";
import type { FC } from "react";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Routes } from "@models/NavTypes";
import { useState } from "react";

// TabNavigator
const Tab = createMaterialBottomTabNavigator();

const AppNavigator = () => {
  // const isTabVisible = useSelector(state => state.tabs.isTabVisible);
  // const [isTabVisible, setIsTabVisible] = useState(null);
  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="#f0edf6"
        // inactiveColor={Colors.secondary.general}
        barStyle={{
          backgroundColor: Colors.primary.dark
          // display: isTabVisible ? null : "none"
        }}
      >
        <Tab.Screen
          name="FeedTab"
          component={FeedScreens}
          options={{
            tabBarLabel: "Feed",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="image-filter-none"
                color={color}
                size={25}
              />
            )
          }}
        />
        <Tab.Screen
          name="CreatorTab"
          component={CreatorScreens}
          options={{
            tabBarLabel: "Creator",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="clipboard-account"
                color={color}
                size={25}
              />
            )
          }}
        />
        <Tab.Screen
          name="SearchTab"
          component={SearchScreens}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ color }) => (
              <Feather name="search" color={color} size={27} />
            )
          }}
        />
        <Tab.Screen
          name="EventTab"
          component={EventScreens}
          options={{
            tabBarLabel: "Event",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="calendar-clock"
                color={color}
                size={25}
              />
            )
          }}
        />
        <Tab.Screen
          name="MenuTab"
          component={MenuScreens}
          options={{
            tabBarLabel: "Menu",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="menu" color={color} size={25} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

// StackNavigator-------------------------------------------------------

const Stack = createNativeStackNavigator();
const MenuStack = createNativeStackNavigator();

// + Feed Tab
const FeedScreens = () => {
  return (
    <Stack.Navigator screenOptions={StackCommonScreenOptions}>
      <Stack.Screen name={Routes.Feed} component={Feed} />
      {/* <Stack.Screen
        name={Routes.SinglePost}
        component={SinglePostPage}
        options={{
          headerShown: false
        }}
      /> */}
      {/* <Stack.Screen
        name={Routes.AddPost}
        component={AddPostPage}
        options={addPostPageOptions}
      /> */}
      <Stack.Screen
        name={Routes.EditPost}
        component={EditPostPage}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

// + Creator Tab
const CreatorScreens = () => {
  return (
    <Stack.Navigator screenOptions={StackCommonScreenOptions}>
      <Stack.Screen name={Routes.CreatorList} component={CreatorList} />
      <Stack.Screen
        name={Routes.Profile}
        component={Profile}
        options={() => options}
      />
      <Stack.Screen
        name={Routes.SinglePost}
        component={SinglePostPage}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name={Routes.WebShop}
        component={WebShop}
        options={{
          headerShown: false
          //tabBarStyle: { display: "none" }
        }}
      />
    </Stack.Navigator>
  );
};

// + Item Tab
const SearchScreens = () => {
  return (
    <Stack.Navigator screenOptions={StackCommonScreenOptions}>
      <Stack.Screen
        name={Routes.Search}
        component={SearchPage}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

// + Event Tab
const EventScreens = () => {
  return (
    <Stack.Navigator screenOptions={StackCommonScreenOptions}>
      <Stack.Screen name={Routes.EventList} component={EventNavigator} />
    </Stack.Navigator>
  );
};

//+ Menu Tab
const MenuScreens = () => {
  return (
    <MenuStack.Navigator screenOptions={StackCommonScreenOptions}>
      <MenuStack.Screen name={Routes.Menu} component={Menu} />

      {MenuList.map((item) => (
        <MenuStack.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          // sharedElements={item.sharedElements}
          options={item.options}
        />
      ))}
    </MenuStack.Navigator>
  );
};

//+Common(Stack - screenOptions)-------------------------------------------------------
const StackCommonScreenOptions = (): NativeStackNavigationOptions => {
  const HEADER_ICON_SIZE = 40;

  const { navigate } = useNavigation();

  return {
    headerTintColor: Colors.primary.light, //the back button and title both use this property as their color.
    headerStyle: {
      backgroundColor: Colors.primary.dark
    },
    headerBackTitleVisible: false,
    animation: "fade", //💚
    headerTitle: () => (
      <Image
        style={{ width: 200, height: HEADER_ICON_SIZE, top: -9 }}
        source={require("@assets/images/logo_2.png")}
        resizeMode="contain"
      />
    )
  };
};

const options = {
  header: () => null,
  gestureEnabled: false,
  headerBackTitleVisible: false,
  transitionSpec: {
    open: {
      animation: "timing",
      config: { duration: 400, easing: Easing.inOut(Easing.ease) }
    },
    close: {
      animation: "timing",
      config: { duration: 400, easing: Easing.inOut(Easing.ease) }
    }
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress
      }
    };
  }
};
