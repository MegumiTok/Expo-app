import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
// import { composeWithDevTools } from "redux-devtools-extension";
// We'll use redux-logger just as an example of adding another middleware
// import logger from "redux-logger";
// type------------------------------------------------
import type { ThunkAction } from "redux-thunk";
import type { Action } from "@reduxjs/toolkit";
// +reducers-----------------------------------------
import { authReducer } from "./authSlice";
import { creatorsReducer } from "./creatorsSlice";
import { postsReducer } from "./postsSlice";

import { eventReducer } from "./eventSlice";

const reducer = {
  auth: authReducer, //認証系
  creators: creatorsReducer, //クリエイターリスト
  posts: postsReducer, //クリエイターの投稿
  events: eventReducer //イベント情報
};
export const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ["payload"] // action.payload に対しては serializableCheck しない}
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>; //追加してみた
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch);
