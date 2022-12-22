import { createSlice } from "@reduxjs/toolkit";

const initialState = [
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

const genresSlice = createSlice({
  name: "genre",
  initialState,
  reducers: {}
});

export const genreReducer = genresSlice.reducer;
