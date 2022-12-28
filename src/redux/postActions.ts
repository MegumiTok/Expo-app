// firebase-----------------------------
import { db, postsColRef } from "src/config/firebase";
import { doc, setDoc, getDocs, getDoc, deleteDoc } from "firebase/firestore";
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

    genre: res.data().genre,
    comment: res.data().comment,
    postedImage: res.data().postedImage,

    imageW: res.data().imageW,
    imageH: res.data().imageH,
    product: res.data().product,

    postedAt: res.data().postedAt,

    isLiked: res.data().isLiked
    // reactions: {
    //   thumbsUp: 0,
    //   hooray: 0,
    //   heart: 0,
    //   clap: 0,
    //   surprise: 0
    // }
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

/*
 * Create
 */
export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  async (creatorPost: Post) => {
    try {
      //   const postRef = doc(postsColRef);
      const postRef = doc(db, CREATORS_POSTS, creatorPost.postId); //✅docIdをpostIdと同じにすることで参照がしやすくなる

      const post: Post = {
        ...creatorPost,
        postedAt: new Date().toISOString(),
        reactions: {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          clap: 0,
          surprise: 0
        }
      };

      await setDoc(postRef, post);
      // return creatorPost;
      return post;
    } catch (error) {
      console.log("createNewPostで例外処理発生", error);
    }
  }
);

/*
 * Update
 */
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (data: Post, thunkAPI) => {
    try {
      const postRef = doc(db, CREATORS_POSTS, data.postId);

      const posts = {
        postedAt: new Date().toISOString(),
        comment: data.comment,
        genre: data.genre
      } as Post;
      await setDoc(
        //If the document does not exist, it will be created. If the document does exist, its contents will be overwritten with the newly provided data,
        postRef,
        posts,
        { merge: true }
      );

      return posts;
    } catch (error) {
      console.log("updatePostで例外処理発生", error);
      // thunkAPI.rejectWithValue(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateLike = createAsyncThunk(
  "posts/updateLike",
  async (data: Post, thunkAPI) => {
    try {
      const postRef = doc(db, CREATORS_POSTS, data.postId);

      const posts = {
        isLiked: data.isLiked
      } as Post;
      await setDoc(
        //If the document does not exist, it will be created. If the document does exist, its contents will be overwritten with the newly provided data,
        postRef,
        posts,
        { merge: true }
      );

      return posts;
    } catch (error) {
      console.log("updateLikeで例外処理発生", error);
      // thunkAPI.rejectWithValue(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/*
 * Read
 */
export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (_, thunkAPI) => {
    try {
      const posts = await getPosts();
      // return posts;

      return posts.sort(
        (a, b) =>
          new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
      );
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

/**
 * Delete
 */
export const deletePost = createAsyncThunk(
  "event/deletePost",
  async (postId: string, thunkAPI) => {
    try {
      await deleteDoc(doc(db, CREATORS_POSTS, postId));
      return postId;
    } catch (e: any) {
      console.error("deletePost", e);
      return thunkAPI.rejectWithValue({ error: e.message });
    }
  }
);
