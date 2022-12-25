import Constants from "expo-constants";

//デフォルトユーザー写真
export const TEST_IMAGE =
  "https://4.bp.blogspot.com/-gKPdnJWscyI/VCIkF3Po4DI/AAAAAAAAmjo/fAKkTMyf8hM/s170/monster01.png";

export const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

//コレクション名
export const ALL_USERS = "all_users";
export const CREATORS_POSTS = "creators_posts"; //名前にpostsを足しました
export const All_EVENTS = "all_events";

//ジャンル
export const GENRES = [
  { label: "フリージャンル", value: "フリージャンル" },
  { label: "お絵かき", value: "お絵かき" },
  { label: "イラスト", value: "イラスト" },
  { label: "食べ物", value: "食べ物" },
  { label: "アニメ/マンガ", value: "アニメ/マンガ" },
  { label: "キャラクター", value: "キャラクター" },
  { label: "お知らせ", value: "お知らせ" }
];
