import type {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from "@react-navigation/native-stack";

import type {
  CompositeScreenProps,
  NavigatorScreenParams
} from "@react-navigation/native";

import type { Post } from "./PostTypes";
import type { Creator } from "./AuthTypes";
import type { EventType } from "./EventType";

import type {
  StackNavigationProp,
  StackScreenProps
} from "@react-navigation/stack";

import type {
  BottomTabNavigationProp,
  BottomTabScreenProps
} from "@react-navigation/bottom-tabs";

export enum Routes {
  Test = "Test", // <--あとで消す
  Chats = "Chats",
  Contacts = "Contacts",
  Chat = "Chat",
  NotFound = "NotFound",
  Feed = "Feed",
  Creator = "Creator",
  AddPost = "AddPost",
  CreatorList = "Creator List",
  Profile = "Profile",
  WebShop = "WebShop",
  PostsDetail = "PostsDetail",
  ProductDetail = "ProductDetail",
  EventList = "Event List",
  EventDetail = "EventDetail",
  EventSinglePost = "EventSinglePost",
  Menu = "Menu List",
  EditPost = "EditPost",
  SinglePost = "Single Post",
  Search = "Search",
  EditProfile = "EditProfile",
  AddEvent = "AddEvent",
  SelectedGenreList = "SelectedGenreList",
  FavList = "FavList"
}

export enum AuthRoutes {
  Login = "Login",
  Signup = "Signup",
  ForgotPassword = "ForgotPassword",
  OnbordingPage = "OnbordingPage"
}

export type CreatorTabParamList = {
  CreatorList: undefined;
  Profile: { item: Creator };
  WebShop: undefined;
  PostsDetail: undefined;
  ProductDetail: undefined;
};

export type RootStackParamList = {
  //ここはinterfaceだとエラーでた
  Feed: { items: Post[] };
  CreatorList: { items: Creator[] };
  Profile: NavigatorScreenParams<CreatorTabParamList>;
  WebShop: undefined;
  PostsDetail: undefined;
  ProductDetail: undefined;
  EventList: undefined;
  EventDetail: undefined;
  // Menu: undefined;
  ItemList: undefined;
  TwitterHeader: undefined;
  Home: undefined;
  EditPost: { postId: string };
  SinglePost: { postId: string };
  AddPost: undefined;
  Search: undefined;
  EditProfile: undefined;
  AddEvent: undefined;
  EventSinglePost: { item: EventType };
};

export type AuthStackParamList = {
  //ここはinterfaceだとエラーでた
  OnbordingPage: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type FeedProps = NativeStackScreenProps<RootStackParamList, Routes.Feed>;

export type CreatorListProps = StackNavigationProp<
  //💚StackNavigationPropを使う
  RootStackParamList,
  Routes.CreatorList
>;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type CreatorTabScreenProps<T extends keyof CreatorTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<CreatorTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type SinglePostProps = NativeStackScreenProps<
  RootStackParamList,
  Routes.SinglePost
>;

export type EventSinglePostProps = NativeStackScreenProps<
  RootStackParamList,
  Routes.EventSinglePost
>;

//auth-----------------------------------------------------------

export type SignUpProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthRoutes.Signup
>;
export type LogInProps = NativeStackScreenProps<
  AuthStackParamList,
  AuthRoutes.Login
>;
export interface ForgotPasswordProps {
  navigation: NativeStackNavigationProp<AuthStackParamList, "ForgotPassword">;
}
