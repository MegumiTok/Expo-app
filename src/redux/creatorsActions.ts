import { ALL_USERS, TEST_IMAGE } from "src/config/const";
import { db, allUsersColRef } from "src/config/firebase";

import { doc, where, setDoc, getDocs, query } from "firebase/firestore";

import { createAsyncThunk } from "@reduxjs/toolkit";
//types--------------------------------------------
import type { Creator } from "@models/AuthTypes";

export const updateCreatorInfo = createAsyncThunk(
  "creators/updateProfile",
  //これはcreatorsではなくAuthスライスで管理すべきだったかも。
  //ただ、Userのprofileアップデートとは別なのでとりあえずこっちに振り分けます。
  async (profile: Creator) => {
    const { creatorId, creatorPhoto, mainComment, creatorName } = profile;
    const updatedAt = new Date().toISOString();
    try {
      if (creatorName) {
        const creatorRef = doc(db, ALL_USERS, creatorName);

        await setDoc(
          //もともと無かったupdatedAtを追加したのでupdateにはsetDocを使う
          creatorRef,
          { userPhoto: creatorPhoto, mainComment, updatedAt },
          { merge: true }
        );
        // await updateDoc(creatorRef, {
        //   userPhoto,
        //   mainComment,
        // });
      }
      return { creatorId, creatorPhoto, mainComment, creatorName, updatedAt };
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchCreators = createAsyncThunk(
  "creators/fetchCreators",
  async (_, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(
        query(
          allUsersColRef,
          // where("userId", "==", userId),
          where("userFlg", "==", "creator")
        )
      );
      const allCreators: Creator[] = querySnapshot.docs.map((res) => ({
        creatorId: res.data().userId,
        creatorName: res.data().userName,
        creatorPhoto: res.data().userPhoto || TEST_IMAGE,
        mainComment: res.data().mainComment as string
      }));
      return allCreators;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: "データをフェッチできませんでした"
      });
    }
  }
);
