import { db, auth, allUsersColRef } from "src/config/firebase";

import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";

import {
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  Timestamp
} from "firebase/firestore";

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
    try {
      // const userId = response.user.uid;

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
          createdAt: Timestamp.fromDate(new Date()),
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
      }
    } catch (e: unknown) {
      console.log("エラー:", e);
      // return thunkAPI.rejectWithValue({
      //   error: "Email already in use",
      // });
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const signInWithEmailPassword = createAsyncThunk(
  "auth/signInWithEmailPassword",
  async ({ email, password }: Login, thunkAPI) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      // return thunkAPI.rejectWithValue({
      //   error: "emailとパスワードでのログイン失敗",
      // });
      return thunkAPI.rejectWithValue(e);
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
    return thunkAPI.rejectWithValue(e);
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
      return thunkAPI.rejectWithValue(e);
    }
  }
);
