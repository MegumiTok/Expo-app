import { GoBack } from "@components/styles/button";
import { View, Text } from "native-base";

import { StatusBar, ImageBackground, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
//const---------------------------------
import { TEST_IMAGE, STATUS_BAR_HEIGHT } from "src/config/const";

//styles------------------------------------------------
import {
  HeaderWrapper,
  ProfileImage
} from "@components/styles/pageStyle/profileStyle";
import { Colors } from "@components/styles/theme/Colors";
//ローカルdata-----------------
// import { posts } from "@assets/data/posts";

//redux-----------------------------------------------------
import { useAppSelector, useAppDispatch } from "@Redux/hook";
import { selectPostsByCreator } from "@Redux/postsSlice";
import { fetchAllPosts } from "@Redux/postActions";

//hooks--------------
import { useComponentHeight } from "@hooks/useComponentHeight";
//comps---------------
import ProfileTabView from "@components/ProfileTabView";
import BtnForCreatorsList from "@components/BtnForCreatorsList";
import ErrorPage from "@components/ErrorPage";
import { LoadingView } from "@components/styles/LoadingView";
// type-------------
import type { CreatorTabScreenProps } from "@models/NavTypes";
import type { Post } from "@models/PostTypes";

export const Profile = ({ route }: CreatorTabScreenProps<"Profile">) => {
  const { item } = route.params;
  const [topHeight, onLayout] = useComponentHeight(); //💚 headerのサイズ取得
  const dispatch = useAppDispatch();
  const postStatus = useAppSelector((state) => state.posts.status);
  const error = useAppSelector((state) => state.posts.error);
  const POSTS = useAppSelector((state) =>
    selectPostsByCreator(state, item.creatorId)
  );

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    dispatch(fetchAllPosts());
    // setPosts(POSTS);
  }, [dispatch]);

  useEffect(() => {
    setPosts(POSTS);
    // setPosts((pos) => [...pos]);
  }, []); //POSTSはreactive valueでないってことを証明したいがどうすれば(ここでPOSTSをdependencyに加えるとinfinite loop)

  let content;
  if (postStatus === "loading") {
    content = <LoadingView />;
  } else if (postStatus === "succeeded") {
    content = (
      <>
        <GoBack />
        <BtnForCreatorsList />
        <View
          style={{
            height: STATUS_BAR_HEIGHT,
            backgroundColor: Colors.primary.dark,
            top: 0,
            opacity: 0.8
          }}
        />

        <View flex={1}>
          <StatusBar animated={true} hidden={false} />

          <HeaderWrapper onLayout={onLayout}>
            <ImageBackground
              style={styles.image}
              source={{
                uri: item.creatorPhoto ? item.creatorPhoto : TEST_IMAGE
              }}
              resizeMode="cover"
              imageStyle={{ opacity: 0.5 }}
            >
              <View
                style={{
                  alignItems: "center" //これでimageとtextを縦並び
                }}
              >
                <ProfileImage
                  source={{
                    uri: item.creatorPhoto ? item.creatorPhoto : TEST_IMAGE
                  }}
                />
                <View //🟢Want to know the size of this component
                  style={{
                    alignItems: "center" //これでimageとtextを縦並び
                  }}
                >
                  <Text fontSize="md" bold style={{ color: "white" }}>
                    {item.creatorName}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </HeaderWrapper>

          <ProfileTabView topHeight={topHeight} posts={posts} />
        </View>
      </>
    );
  } else if (postStatus === "failed") {
    content = <ErrorPage error={error} />;
  }
  return <>{content}</>;
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center"
    // opacity: 0.6
  }
});
