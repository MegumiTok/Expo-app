import { Easing, Image, TouchableWithoutFeedback } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { View } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

import Test from "src/templates/Test";
import { Colors } from "@components/styles/theme/Colors";

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
          name="ItemTab"
          component={ItemScreens}
          options={{
            tabBarLabel: "Item",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="shopping" color={color} size={27} />
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
      <Stack.Screen name={Routes.Feed} component={Test} />
    </Stack.Navigator>
  );
};

// + Creator Tab
const CreatorScreens = () => {
  return (
    <Stack.Navigator screenOptions={StackCommonScreenOptions}>
      <Stack.Screen name={Routes.Test} component={Test} />
    </Stack.Navigator>
  );
};

// + Item Tab
const ItemScreens = () => {
  return (
    <Stack.Navigator screenOptions={StackCommonScreenOptions}>
      <Stack.Screen name={Routes.Test} component={Test} />
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
    <Stack.Navigator screenOptions={StackCommonScreenOptions}>
      <Stack.Screen name={Routes.Test} component={Test} />
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
    // headerRight: () => (
    //   <View style={{ flexDirection: "row" }}>
    //     <MaterialCommunityIcons
    //       name="cart"
    //       color={"white"}
    //       size={30}
    //       style={{ top: 2, right: 3 }}
    //     />
    //     <MaterialCommunityIcons
    //       name="bell"
    //       color={"white"}
    //       size={25}
    //       style={{ top: 5, right: -3 }}
    //     />
    //   </View>
    // ),

    // headerRight: () => (
    //   <TouchableWithoutFeedback
    //     style={{ flexDirection: "row" }}
    //     onPress={() => navigate(Routes.AddPost)}
    //     // onPress={() => true}
    //   >
    //     <FontAwesome5 name="plus-square" size={30} color="white" />
    //   </TouchableWithoutFeedback>
    // )
  };
};
