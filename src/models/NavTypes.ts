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

export enum Routes {
  Test = "Test", // <--あとで消す
  Chats = "Chats",
  Contacts = "Contacts",
  Chat = "Chat",
  NotFound = "NotFound",
  Feed = "Feed",
  Creator = "Creator",
  AddPost = "AddPost",
  CreatorList = "CreatorList",
  Profile = "Profile",
  WebShop = "WebShop",
  PostsDetail = "PostsDetail",
  ProductDetail = "ProductDetail",
  EventList = "EventList",
  EventDetail = "EventDetail",
  Menu = "Menu",
  EditPost = "EditPost",
  SinglePost = "SinglePost",
  Search = "Search",
  EditProfile = "EditProfile",
  AddEvent = "AddEvent"
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
};

export type FeedProps = NativeStackScreenProps<RootStackParamList, Routes.Feed>;
