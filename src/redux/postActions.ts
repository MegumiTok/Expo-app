// firebase-----------------------------
import { db, postsColRef } from "src/config/firebase";
import { doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { CREATORS_POSTS } from "src/config/const";

//type-----------------------------------------------------
import type { Post } from "@models/PostTypes";

// redux--------------------------------------------------
import { createAsyncThunk } from "@reduxjs/toolkit";

//function-----------------------------------------------------------------
const getPosts = async () => {
  const querySnapshot = await getDocs(postsColRef);

  const posts: Post[] = querySnapshot.docs.map((res) => ({
    postId: res.data().postId,

    creatorId: res.data().creatorId,
    creatorName: res.data().creatorName,
    creatorPhoto: res.data().creatorPhoto,
    date: res.data().date,
    genre: res.data().genre,
    comment: res.data().comment,
    postedImage: res.data().postedImage,
    reactions: res.data().reactions,
    imageW: res.data().imageW,
    imageH: res.data().imageH,
    product: res.data().product
  }));
  return posts;
};

const getSinglePostByID = async (postId: string) => {
  const docRef = doc(db, CREATORS_POSTS, postId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const postData = docSnap.data() as Post;

    return {
      ...postData
      // postId,
      // creatorName: creatorData?.creatorName,
      // creatorPhoto: creatorData?.creatorPhoto,
    } as Post;
  }
  return null;
};

// createAsyncThunk-------------------------------------------------------------------------
export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  async (creatorPost: Post) => {
    try {
      //   const postRef = doc(postsColRef);
      const postRef = doc(db, CREATORS_POSTS, creatorPost.postId); //✅docIdをpostIdと同じにすることで参照がしやすくなる

      await setDoc(postRef, creatorPost);
      return creatorPost;
    } catch (error) {
      console.log("createNewPostで例外処理発生", error);
    }
  }
);

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (_, thunkAPI) => {
    try {
      const posts = await getPosts();
      return posts;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: "fetchAllPosts失敗"
      });
    }
  }
);

export const fetchSinglePostByID = createAsyncThunk(
  "posts/fetchSinglePostByID",
  async (id: string) => {
    const singlePost = await getSinglePostByID(id);
    return singlePost;
  }
);
