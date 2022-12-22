import type { Post } from "./PostTypes";
import { Status } from "./PostTypes";

// flg-------------------
export type flg = "creator" | "general" | "stuff";

//AuthTypes-全ユーザーに共通している情報----------------------------
export interface Auth {
  //all_usersのCollectionに入る情報
  //EditProfileページで最終的に全更新！
  createdAt: any;
  email: string | null; //setCurrentUserの都合でnull
  mainComment: string | null; //Creatorだけ登録
  userFlg: flg | null;
  userId: string | null;
  userName: string | null; //setCurrentUserの都合でnull
  userPhoto: string | null; //setCurrentUserの都合でnull

  updatedAt: any;
}
//CreatorTypes-------------------------------
// Creator情報を出すときだけ使いたいのでこの方はAuthと別で必要。
export interface Creator {
  creatorId: string; //uid keyExtraに使いたいのでnullをはずしたい
  creatorName: string;
  creatorPhoto: string | null;
  // posts?: Post[];
  mainComment: string;
  updatedAt?: any;
}

//Login-------------------------
export interface Login {
  email: string;
  password: string;
}

// Register--------------------
export interface Register {
  email: string;
  userName: string;
  // userPhoto: string; //登録段階では選択なし
  userFlg: flg;

  password: string; //登録時だけ必要
}
