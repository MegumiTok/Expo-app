export interface Post {
  postId: string;
  creatorId: string; //selectPostsByUserで使用中
  creatorName: string | null;
  creatorPhoto: string | null; //null必要（type Creator参照）//userで管理しようと思ったがこちらの方が楽

  genre: string;
  comment: string;
  // postedImage: string | [];
  postedImage: string; //一枚投稿のみ
  reactions?: {
    thumbsUp: number;
    hooray: number;
    heart: number;
    clap: number;
    surprise: number;
  };
  // isLiked: boolean;
  // carrousel: boolean;
  imageW: number;
  imageH: number;
  // documentID?: string;
  product: boolean; //追加

  postedAt?: any;
  updatedAt?: any; //追加
}

// export interface AllPosts {
//   allPosts: Post[];
//   loading: boolean;
//   error: string | unknown;
// }

export type ReactionType =
  | "thumbsUp"
  | "hooray"
  | "heart"
  | "clap"
  | "surprise";
