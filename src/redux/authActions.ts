import { db, auth, allUsersColRef } from "src/config/firebase";

import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";

import { doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";

//type-------------------------------------------------------------------
import type { Auth, Login, Register } from "@models/AuthTypes";
import type { User } from "firebase/auth";

//style----------------------------------------------------------
import { ALL_USERS, TEST_IMAGE } from "src/config/const";

export const fetchAuthUser = createAsyncThunk(
  "auth/fetchAuthUser",
  async (user: User, thunkAPI) => {
    try {
      const docSnap = await getDoc(doc(db, ALL_USERS, user.uid)); //<-----ここuserNameでは
      const authUser = docSnap.data() as Auth;
      return authUser;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: "認証データをとってこれませんでした"
      });
    }
  }
);

export const signUpWithEmailPassword = createAsyncThunk(
  "auth/signUpWithEmailPassword",
  async (data: Register, thunkAPI) => {
    const { email, password, userName, userFlg } = data;
    const msg = "入力された名前は使用されています";
    const msg_2 = "Email already in us";
    try {
      // const userId = response.user.uid;

      const userNameRef = doc(db, ALL_USERS, userName);
      const docSnap = await getDoc(userNameRef);

      if (docSnap.exists()) {
        console.log(msg, userName);
        return thunkAPI.rejectWithValue(msg);
      }

      const q = query(allUsersColRef, where("email", "==", email));
      const usersDocs = await getDocs(q);

      if (usersDocs.docs.length === 0) {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = response.user;
        // const userRef = doc(allUsersColRef);
        const userRef = doc(db, ALL_USERS, userName); //名前は変更不可にする
        await setDoc(userRef, {
          userName,
          email,
          userId: user.uid,
          userPhoto: "",
          userFlg: userFlg,
          createdAt: new Date().toISOString(),
          mainComment: ""
        });

        //The updateProfil method return Promise,so you have to wait the resolution of this before display the displayName.
        const currentUser = auth.currentUser;
        if (currentUser !== null) {
          await updateProfile(user, {
            displayName: userName,
            photoURL: TEST_IMAGE
          } as User);
        }
      } else {
        console.log(msg_2);
        return thunkAPI.rejectWithValue(msg_2);
      }
    } catch (e: unknown) {
      console.log("エラー:", e);
      // return thunkAPI.rejectWithValue({
      //   error: "Email already in use"
      // });
      return thunkAPI.rejectWithValue("signUpWithEmailPassword失敗");
    }
  }
);

export const signInWithEmailPassword = createAsyncThunk(
  "auth/signInWithEmailPassword",
  async ({ email, password }: Login, thunkAPI) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.error(e);
      return thunkAPI.rejectWithValue(
        "登録されているemailかpasswordと一致しません"
      );
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (e) {
    // return thunkAPI.rejectWithValue({
    //   error: "ログアウト失敗",
    // });
    return thunkAPI.rejectWithValue("エラー");
  }
});

export const sendPasswordReset = createAsyncThunk(
  "auth/sendPasswordReset",
  async (email: string, thunkAPI) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (e) {
      // return thunkAPI.rejectWithValue({
      //   error: "パスワードリセット失敗",
      // });
      return thunkAPI.rejectWithValue("パスワードリセット失敗");
    }
  }
);
