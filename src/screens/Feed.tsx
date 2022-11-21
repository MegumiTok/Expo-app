import { useState, useCallback } from "react";

import {
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  SafeAreaView,
  Modal,
  Button
} from "react-native";

import { posts } from "@assets/data/posts";
import { LoadingView } from "@components/styles/LoadingView";
import FeedPost from "@components/FeedPost";
//type--------------------------------------------
import type { FC } from "react";
import type { Post } from "@models/PostTypes";

export const Feed: FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const _listFooterComponent = () => {
    return <>{loading ? <LoadingView /> : null}</>;
  };

  return (
    <SafeAreaView>
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
        onRefresh={_onRefresh}
        onEndReachedThreshold={0.2}
        onEndReached={_onEndReached}
        ListFooterComponent={_listFooterComponent}
        scrollEventThrottle={16}
      />
    </SafeAreaView>
  );
};
