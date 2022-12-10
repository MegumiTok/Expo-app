import { useState, useCallback, useEffect } from "react";

import {
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  SafeAreaView,
  Modal,
  Alert
} from "react-native";

//ローカル
// import { posts } from "@assets/data/posts";

import { LoadingView } from "@components/styles/LoadingView";
import FeedPost from "@components/FeedPost";
// firebase----------------------------
import { getDocs } from "firebase/firestore";
import { postsColRef } from "src/config/firebase";
//type--------------------------------------------
import type { FC } from "react";
import type { Post } from "@models/PostTypes";

export const Feed: FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const list = [] as Post[];
        const querySnapshot = await getDocs(postsColRef);
        querySnapshot.forEach((doc) => {
          const {
            postId,
            creatorId,
            creatorName,
            creatorPhoto,
            date,
            genre,
            comment,
            postedImage,
            reactions,
            imageW,
            imageH,
            product
          } = doc.data();

          list.push({
            postId,
            creatorId,
            creatorName,
            creatorPhoto,
            date,
            genre,
            comment,
            postedImage,
            reactions,
            imageW,
            imageH,
            product
          });
        });
        setPosts(list);
        console.log("リスト", list);

        if (loading) {
          setLoading(false);
        }
      } catch (e) {
        Alert.alert("fetchPostsに失敗しました。");
        console.log("エラー:", e);
      }
    };

    fetchPosts(); //async functionを使っているのでこのような書き方になる
  }, [loading]); //🔴dependency array.を外したらuseEffectが永遠ループに入った

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

  return (
    <>
      {loading ? (
        <LoadingView />
      ) : (
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
      )}
    </>
  );
};
