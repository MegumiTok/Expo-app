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
  { label: "商品化アイテム", value: "商品化アイテム" },
  { label: "ファッション", value: "ファッション" },
  { label: "どうぶつ", value: "どうぶつ" },
  { label: "食べ物", value: "食べ物" },
  { label: "アニメ/マンガ", value: "アニメ/マンガ" },
  { label: "ポップ", value: "ポップ" },
  { label: "キャラクター", value: "キャラクター" },
  { label: "LINEスタンプ", value: "LINEスタンプ" },
  { label: "お知らせ", value: "お知らせ" },
  { label: "フリージャンル", value: "フリージャンル" }
];
