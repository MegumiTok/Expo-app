import { useState, useEffect, useCallback } from "react";

import { FlatList, RefreshControl } from "react-native";

import { LoadingView } from "@components/styles/LoadingView";
import FeedLoadingScreen from "@components/FeedLoadingScreen";
import FeedPost from "@components/FeedPost";

import ErrorPage from "@components/ErrorPage";
//redux
import { selectAllPosts } from "@Redux/postsSlice";
import { useAppDispatch, useAppSelector } from "@Redux/hook";
import { fetchAllPosts } from "@Redux/postActions";
import { FEED_LIST_CONFIG } from "@components/styles/theme/layout";

//type
import type { FC } from "react";
import type { Post } from "@models/PostTypes";

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchAllPosts());
    }
  }, [postStatus, dispatch]);

  const _renderItem = useCallback(
    ({ item }: { item: Post }) => <FeedPost item={item} />,
    []
  );

  const _onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchAllPosts());
    setRefreshing(false);
  }, [dispatch]);

  let content;
  if (postStatus === "loading") {
    content = (
      <>
        <FeedLoadingScreen />
        <FeedLoadingScreen />
      </>
    );
  } else if (postStatus === "succeeded") {
    content = (
      <>
        {refreshing ? <LoadingView /> : null}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.postId}
          renderItem={_renderItem}
          showsVerticalScrollIndicator={false}
          {...FEED_LIST_CONFIG}
          removeClippedSubviews
          refreshing={refreshing}
          onEndReachedThreshold={0.2}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
          }
        />
      </>
    );
  } else if (postStatus === "failed") {
    content = <ErrorPage error={error} />;
  }
  return <>{content}</>;
};
