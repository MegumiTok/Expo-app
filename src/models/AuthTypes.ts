import type { Post } from "./PostTypes";
import { Status } from "./PostTypes";
export type flg = "creator" | "general" | "stuff";
//AuthTypes-全ユーザーに共通している情報----------------------------
export interface Auth {
  //all_usersのCollectionに入る情報
  //EditProfileページで最終的に全更新！
  email: string | null; //setCurrentUserの都合でnull付けた
  userName: string | null; //setCurrentUserの都合でnull付けた
  userPhoto: string | null; //setCurrentUserの都合でnull付けた
  userFlg: flg | null;

  userId: string | null; //認証されたら付与
  createdAt: any; //型不明
  updatedAt: any;
  mainComment: string | null; //Creatroだけ登録
}

// export interface AuthProps {
//   data: Auth;
//   allAuthData: Auth[]; //追加
//   error?: SerializedError | string;
//   status: Status;
// }

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

//CreatorTypes-------------------------------

export interface Creator {
  creatorId: string; //uid keyExtraに使いたいのでnullをはずしたい
  creatorName: string | null;
  // email: string;
  creatorPhoto: string | null;

  posts?: Post[];
  mainComment: string | null;
}
