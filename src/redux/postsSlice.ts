import { createSlice } from "@reduxjs/toolkit";
//+type---------------------------------
import type { Status } from "@models/StatusType";
import type { Post } from "@models/PostTypes";

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
  reducers: {}
});

export const postsReducer = postsSlice.reducer;
