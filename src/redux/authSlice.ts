import { createSlice } from "@reduxjs/toolkit";

import {
  logout,
  sendPasswordReset,
  signInWithEmailPassword,
  // signInWithGoogle,
  fetchAuthUser,
  signUpWithEmailPassword
} from "./authActions";
//type--------------------------
import type { User } from "firebase/auth";
import type { PayloadAction, SerializedError } from "@reduxjs/toolkit";
import type { Auth } from "@models/AuthTypes";
import type { Status } from "@models/StatusType";
import type { RootState } from "./store";
// import { flg } from "@models/AuthTypes";

export interface AuthProps {
  currentUser: Auth;
  error: string | undefined;
  status: Status;
}
const initialState: AuthProps = {
  currentUser: {
    userId: "",
    userName: "",
    email: "",
    userPhoto: "",
    userFlg: "creator" || "general" || "stuff",
    createdAt: "",
    updatedAt: "",
    mainComment: ""
  },
  error: "",
  status: "idle"
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // clearCurrentUser: (state) => {
    //   state.currentUser = initialState.currentUser;
    // }
    // setCurrentUser: (state, action: PayloadAction<User>) => {
    //   //autoLoginに使える
    //   // if (action.payload.email !== null) {
    //   state.currentUser.userId = action.payload.uid;
    //   state.currentUser.userName = action.payload.displayName;
    //   state.currentUser.email = action.payload.email;
    //   state.currentUser.userPhoto = action.payload.photoURL;
    //   // }
    // }
  },
  extraReducers: (builder) => {
    //ログアウト＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    builder.addCase(logout.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.status = "succeeded";
      state.currentUser = initialState.currentUser;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    //メアドとパスワードでの ログイン ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    builder.addCase(signInWithEmailPassword.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signInWithEmailPassword.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    //メアドとパスワードでの サインアップ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    builder.addCase(signUpWithEmailPassword.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signUpWithEmailPassword.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    });
    builder.addCase(signUpWithEmailPassword.fulfilled, (state, action) => {
      state.status = "succeeded";
      // state.data = action.payload as Auth;
    });
    //Googleでのサインイン===================================
    // builder.addCase(signInWithGoogle.pending, (state) => {
    //   state.status = "loading";
    // });
    // builder.addCase(signInWithGoogle.rejected, (state, action) => {
    //   state.error = action.error;
    //   state.status = "failed";
    // });
    //パスワードリセット＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    builder.addCase(sendPasswordReset.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(sendPasswordReset.fulfilled, (state) => {
      state.status = "succeeded";
    });
    builder.addCase(sendPasswordReset.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    //認証ずみユーザー情報取得＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    builder.addCase(fetchAuthUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAuthUser.fulfilled, (state, action) => {
      state.currentUser = action.payload as Auth;
      state.status = "succeeded";
    });
    //Activeユーザー（クリエイターのみ）のプロフィール変更＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    //Auth側かCreator側に置くか悩みました
    // builder.addCase(updateActiveCreatorInfo.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    // });
    // builder.addCase(updateActiveCreatorInfo.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message;
    // });
  }
});

const { actions, reducer } = authSlice;
export const authReducer = reducer;

// export const { clearCurrentUser } = actions;

// export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
