import { createSlice } from "@reduxjs/toolkit";

import { fetchAllPosts, createNewPost } from "./postActions";
//+type---------------------------------
import type { Status } from "@models/StatusType";
import type { Post } from "@models/PostTypes";
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
    updatePost(state, action: PayloadAction<Post>) {
      const { postId, comment, genre, postedAt } = action.payload;
      const existingPost = state.allPosts.find(
        (item) => item.postId === postId
      );
      if (existingPost) {
        existingPost.comment = comment;
        existingPost.genre = genre;
        existingPost.postedAt = postedAt;
      }
    }
  },
  extraReducers(builder) {
    builder
      //投稿をする======================================================
      .addCase(createNewPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        if (action.payload) {
          //この書き方がいいかわからないがこれでundefined問題を解決
          state.status = "succeeded";
          state.allPosts.push(action.payload); //undefined問題解決したい
        }
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
      });
  }
});

export const { updatePost } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;

export const selectAllPosts = (state: RootState) => state.posts.allPosts;

export const selectSinglePostById = (state: RootState, postId: string) =>
  selectAllPosts(state).find((post) => post.creatorId === postId);

export const selectPostsByCreator = (state: RootState, creatorId: string) =>
  selectAllPosts(state).filter((post) => post.creatorId === creatorId);
