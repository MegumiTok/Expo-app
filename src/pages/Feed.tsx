import { useState, useEffect } from "react";

import { FlatList, RefreshControl } from "react-native";

//ローカル
// import { posts } from "@assets/data/posts";

import { LoadingView } from "@components/styles/LoadingView";
import FeedLoadingScreen from "@components/FeedLoadingScreen";
import FeedPost from "@components/FeedPost";

import ErrorPage from "@components/ErrorPage";
//redux----------------------------------------------------------------
import { selectAllPosts } from "@Redux/postsSlice";
import { useAppDispatch, useAppSelector } from "@Redux/hook";
import { fetchAllPosts } from "@Redux/postActions";

//type--------------------------------------------
import type { FC } from "react";
import type { Post } from "@models/PostTypes";

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);

  const [refreshing, setRefreshing] = useState(false);

  // It's important that we only try to fetch the list of posts once. If we do it every time the <PostsList> component renders, or is re-created because we've switched between views, we might end up fetching the posts several times. We can use the posts.status enum to help decide if we need to actually start fetching, by selecting that into the component and only starting the fetch if the status is 'idle'.
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchAllPosts());
    }
  }, [postStatus, dispatch]);

  const _renderItem = ({ item }: { item: Post }) => {
    return <FeedPost item={item} />;
  };

  // const _listFooterComponent = () => {
  //   return <>{loading ? <LoadingView /> : null}</>;
  // };

  const _onRefresh = () => {
    setRefreshing(true);
    // dispatch(
    //   updateLike({
    //     postId: item.postId,
    //     isLiked: trigger
    //   } as Post)
    // );
    dispatch(fetchAllPosts());
    setRefreshing(false);
  };

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
          initialNumToRender={5} //default is 10
          maxToRenderPerBatch={5} //default is 10
          updateCellsBatchingPeriod={30} // default is 50
          windowSize={10} //default value is 21 (10 viewports above, 10 below, and one in between).
          removeClippedSubviews
          refreshing={refreshing}
          // onRefresh={_onRefresh}
          onEndReachedThreshold={0.2}
          // onEndReached={_onEndReached}
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
