import { Easing, TouchableWithoutFeedback } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { View } from "native-base";

import { Colors } from "@components/styles/theme/Colors";

//main page---------------------------------------
import { Feed } from "src/pages/Feed";
import { CreatorList } from "src/pages/CreatorList";
import { SearchNavigator } from "@navigation/SearchNavigator";
import { EventNavigator } from "./EventNavigator";
import Menu from "@pages/Menu";

// sub page---------------------------------------
import { Profile } from "@pages/Profile";
import SinglePostPage from "@pages/SinglePostPage";
import WebShop from "@pages/WebShop";
import AddPostPage from "@pages/AddPostPage";
import EditPostPage from "@pages/EditPostPage";
import EditProfilePage from "@pages/EditProfilePage";
import EventSinglePost from "@pages/eventPage/EventSinglePost";
import { SelectedGenreList } from "@pages/searchPage/SelectedGenreList";
import FavList from "@pages/searchPage/FavList";
//data =====================
import MenuList from "@assets/data/MenuList";

//type--------------------------------------
import { Routes } from "@models/NavTypes";

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
            tabBarColor: Colors.primary.dark,
            tabBarLabel: "Feed",
            // eslint-disable-next-line react/no-unstable-nested-components
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
            tabBarColor: Colors.primary.general,
            tabBarLabel: "Creator",
            // eslint-disable-next-line react/no-unstable-nested-components
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
            tabBarColor: "#8EB19D",
            tabBarLabel: "Search",
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ color }) => (
              <Feather name="search" color={color} size={27} />
            )
          }}
        />
        <Tab.Screen
          name="EventTab"
          component={EventScreens}
          options={{
            tabBarColor: "#cec244",
            tabBarBadge: 3, //<--------
            tabBarLabel: "Event",
            // eslint-disable-next-line react/no-unstable-nested-components
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
            tabBarColor: Colors.secondary.general,
            tabBarLabel: "Menu",
            // eslint-disable-next-line react/no-unstable-nested-components
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
    <Stack.Navigator screenOptions={FeedStuckOption}>
      <Stack.Screen name={Routes.Feed} component={Feed} />

      <Stack.Screen
        name={Routes.AddPost}
        component={AddPostPage}
        // options={addPostPageOptions}
      />
      <Stack.Screen
        name={Routes.EditProfile}
        component={EditProfilePage}
        // options={addPostPageOptions}
      />
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
        }}
      />
    </Stack.Navigator>
  );
};

// + Search Tab========================
const SearchScreens = () => {
  return (
    <Stack.Navigator screenOptions={StackCommonScreenOptions}>
      <Stack.Screen
        name={Routes.Search}
        component={SearchNavigator}
        // options={{ header: () => null }}
      />
      <Stack.Screen
        name={Routes.SelectedGenreList}
        component={SelectedGenreList}
        // options={{ header: () => null }}
      />
      <Stack.Screen
        name={Routes.FavList}
        component={FavList}
        // options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

// + Event Tab
const EventScreens = () => {
  return (
    <Stack.Navigator screenOptions={StackCommonScreenOptions}>
      <Stack.Screen name={Routes.EventList} component={EventNavigator} />
      <Stack.Screen name={Routes.EventSinglePost} component={EventSinglePost} />
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

//  screenOptions=============================================
const FeedStuckOption = ({ navigation }) => {
  const HEADER_ICON_SIZE = 50;
  return {
    headerStyle: {
      backgroundColor: Colors.primary.dark
    },

    animation: "fade", //💚
    // ヘッダーのロゴ表示オンの場合=====
    // headerTintColor: Colors.primary.light, //the back button and title both use this property as their color.
    // headerBackTitleVisible: false,
    // headerTitle: () => (
    //   <Image
    //     style={{ width: 200, height: HEADER_ICON_SIZE, top: -7 }}
    //     source={require("@assets/images/logo_3.png")}
    //     resizeMode="contain"
    //   />
    // ),

    // ヘッダーのロゴ表示オフの場合=====
    headerTintColor: "white",
    headerTitleStyle: {
      fontWeight: "800",
      fontSize: 20
    },
    headerBackTitleVisible: true,
    headerRight: () => (
      <View
        style={{
          flexDirection: "row",
          // backgroundColor: "tomato",
          width: 80,
          justifyContent: "space-between"
        }}
      >
        <TouchableWithoutFeedback
          style={{ padding: 5, backgroundColor: "blue" }}
          onPress={() => navigation.navigate(Routes.AddPost)}
        >
          <FontAwesome5 name="plus-square" size={30} color="white" />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={{ right: -45, margin: 5 }}
          onPress={() => navigation.navigate(Routes.EditProfile)}
        >
          <Feather name="user" color="white" size={30} />
        </TouchableWithoutFeedback>
      </View>
    )
  };
};

const StackCommonScreenOptions = ({ navigation }) => {
  return {
    headerTintColor: "white", //the back button and title both use this property as their color.
    headerStyle: {
      backgroundColor: Colors.primary.dark
    },
    headerTitleStyle: {
      fontWeight: "800",
      fontSize: 20
    },
    headerBackTitleVisible: true,

    headerRight: () => (
      <View
        style={{
          flexDirection: "row",
          // backgroundColor: "tomato",
          width: 80,
          justifyContent: "space-between"
        }}
      >
        <TouchableWithoutFeedback
          style={{ padding: 5, backgroundColor: "blue" }}
          onPress={() => navigation.navigate(Routes.AddPost)}
        >
          <FontAwesome5 name="plus-square" size={30} color="white" />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          style={{ right: -45, margin: 5 }}
          onPress={() => navigation.navigate(Routes.EditProfile)}
        >
          <Feather name="user" color="white" size={30} />
        </TouchableWithoutFeedback>
      </View>
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
