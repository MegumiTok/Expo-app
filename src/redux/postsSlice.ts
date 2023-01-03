import { createSlice } from "@reduxjs/toolkit";

import {
  fetchAllPosts,
  createNewPost,
  updatePost,
  updateLike,
  deletePost
} from "./postActions";
//+type---------------------------------
import type { Status } from "@models/StatusType";
import type { Post, ReactionType } from "@models/PostTypes";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface StateType {
  allPosts: Post[]; //命名は単純にpostsでよかったかな
  postsByUserID: Post[];
  currentPost: Post | null;
  status: Status;
  error: string | undefined;
}

const initialState = {
  allPosts: [],
  postsByUserID: [],
  currentPost: null,
  status: "idle",
  error: ""
} as StateType;

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // updateLike(state, action: PayloadAction<Post>) {
    //   const { postId, isLiked } = action.payload;
    //   const existingPost = state.allPosts.find(
    //     (item) => item.postId === postId
    //   );
    //   if (existingPost) {
    //     existingPost.isLiked = isLiked;
    //     // existingPost.genre = genre;
    //     // existingPost.postedAt = postedAt;
    //   }
    // }
    // reactionAdded(
    //   state,
    //   action: PayloadAction<{ postId: string; reaction: ReactionType }>
    // ) {
    //   const { postId, reaction } = action.payload;
    //   const existingPost = state.allPosts.find(
    //     (item) => item.postId === postId
    //   );
    //   // const existingPost = state.entities[postId];
    //   if (existingPost) {
    //     existingPost.reactions[reaction]++;
    //   }
    // }
  },
  extraReducers(builder) {
    builder
      //投稿をする======================================================
      .addCase(createNewPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNewPost.fulfilled, (state, { payload }) => {
        // console.log(payload);
        if (payload) {
          //この書き方がいいかわからないがこれでundefined問題を解決
          state.status = "succeeded";
          state.allPosts.push(payload);
        }

        // state.status = "succeeded";
        // state.allPosts.push(payload);
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //クリエイターの投稿情報を持ってくる=====================================================================================
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        //ローディングが終わったらarrayにitemsを追加する
        state.status = "succeeded";
        state.allPosts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //投稿をアップデートする=====================================================================================
      .addCase(updatePost.pending, (state) => {
        console.log("投稿をアップデートする:");
        state.status = "loading";
      })
      // .addCase(updatePost.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.currentPost = action.payload;
      // })
      .addCase(updatePost.fulfilled, (state, action) => {
        // if (action.payload) {
        console.log("テスト:", action.payload);
        state.status = "succeeded";
        const { postId, comment, genre, postedAt } = action.payload;
        const existingPost = state.allPosts.find(
          (item) => item.postId === postId
        );
        if (existingPost) {
          existingPost.comment = comment;
          existingPost.genre = genre;
          existingPost.postedAt = postedAt;
        }
        // }
      })

      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //Likeあるなしをアップデートする=====================================================================================
      //これをセットするとstatusが変わるたびにローディング画面に切り替わってしまいlike程度のアプデには不向き
      //できればFeedコンポーネントでのReloadのタイミングでFBにアプデをかけるようにしたいところ(現在はLIKE押すたびにアプデ通信がある)
      // .addCase(updateLike.pending, (state) => {
      //   state.status = "loading";
      // })

      .addCase(updateLike.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { postId, isLiked } = action.payload;
        const existingPost = state.allPosts.find(
          (item) => item.postId === postId
        );
        if (existingPost) {
          existingPost.isLiked = isLiked;
        }
      })

      .addCase(updateLike.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //ポストを削除========================================================
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allPosts = state.allPosts.filter(
          (doc) => doc.postId !== action.payload
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

// export const { updateLike } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;

export const selectAllPosts = (state: RootState) => state.posts.allPosts;

export const selectSinglePostById = (state: RootState, postId: string) =>
  selectAllPosts(state).find((post) => post.postId === postId);

export const selectPostsByCreator = (state: RootState, creatorId: string) =>
  selectAllPosts(state).filter((post) => post.creatorId === creatorId);

export const selectPostsByGenre = (state: RootState, genre: string) =>
  selectAllPosts(state).filter((post) => post.genre === genre);
