import { useState, useCallback, useEffect } from "react";

import { FlatList, Alert } from "react-native";

//ローカル
// import { posts } from "@assets/data/posts";

import { LoadingView } from "@components/styles/LoadingView";
import FeedPost from "@components/FeedPost";

import ErrorPage from "@components/ErrorPage";
//redux----------------------------------------------------------------
import { selectAllPosts } from "@Redux/postsSlice";
import { useAppDispatch, useAppSelector } from "@Redux/hook";
import { fetchAllPosts } from "@Redux/postActions";
//Context------------------------------------
import useUser from "@hooks/useUser";
//type--------------------------------------------
import type { FC } from "react";
import type { Post } from "@models/PostTypes";

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // It's important that we only try to fetch the list of posts once. If we do it every time the <PostsList> component renders, or is re-created because we've switched between views, we might end up fetching the posts several times. We can use the posts.status enum to help decide if we need to actually start fetching, by selecting that into the component and only starting the fetch if the status is 'idle'.
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchAllPosts());
    }
  }, [postStatus, dispatch]);

  const _renderItem = ({ item }: { item: Post }) => {
    return <FeedPost item={item} />;
  };

  const _onRefresh = useCallback(() => {
    setRefreshing(true); //refreshing is a controlled prop, this is why it needs to be set to true in the onRefresh function otherwise the refresh indicator will stop immediately.
    // wait(2000).then(() => setRefreshing(false));
    setTimeout(() => {
      // setPosts([...posts, ...dataAPI.posts]);
      setRefreshing(false);
    }, 2000);
  }, []);

  const _onEndReached = () => {
    setLoading(true);
    setTimeout(() => {
      // setPosts([...posts, ...dataAPI.posts]);
      setLoading(false);
    }, 2000);
  };

  // const _listFooterComponent = () => {
  //   return <>{loading ? <LoadingView /> : null}</>;
  // };

  let content;
  if (postStatus === "loading") {
    content = <LoadingView />;
  } else if (postStatus === "succeeded") {
    content = (
      <FlatList
        data={posts}
        keyExtractor={(item) => item.postId}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
        initialNumToRender={3} //default is 10
        maxToRenderPerBatch={3}
        windowSize={5}
        removeClippedSubviews
        refreshing={refreshing}
        // onRefresh={_onRefresh}
        onEndReachedThreshold={0.2}
        // onEndReached={_onEndReached}
        // ListFooterComponent={_listFooterComponent}
        scrollEventThrottle={16}
      />
    );
  } else if (postStatus === "failed") {
    content = <ErrorPage error={error} />;
  }
  return <>{content}</>;
};
