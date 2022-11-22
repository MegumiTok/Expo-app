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

//screens
import { Feed } from "src/pages/Feed";
import { CreatorList } from "src/pages/CreatorList";
import { SearchPage } from "@pages/SearchPage";

//private
import Pra from "@private/Pra";

//type--------------------------------------
// import type {
//   RootStackParamList,
//   PrivateMenuStackParamList
// } from "@modules/models";
import type { FC } from "react";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Routes } from "@models/NavTypes";

// TabNavigator
const Tab = createMaterialBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
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
    </Stack.Navigator>
  );
};

// + Creator Tab
const CreatorScreens = () => {
  return (
    <Stack.Navigator screenOptions={StackCommonScreenOptions}>
      <Stack.Screen name={Routes.CreatorList} component={CreatorList} />
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
      <Stack.Screen name={Routes.Test} component={Test} />
    </Stack.Navigator>
  );
};

//+ Menu Tab
const MenuScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.Test} component={Pra} />
    </Stack.Navigator>
  );
};

//+Common(Stack - screenOptions)-------------------------------------------------------
const StackCommonScreenOptions = (): NativeStackNavigationOptions => {
  const HEADER_ICON_SIZE = 50;

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
        source={require("@assets/images/logo.png")}
        resizeMode="contain"
      />
    )
  };
};
