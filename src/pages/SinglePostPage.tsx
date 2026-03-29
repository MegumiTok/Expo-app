import { Image } from "react-native";
import { Text, View, StatusBar } from "native-base";

import PostHeader from "@components/PostHeader";

//type
import type { FC } from "react";
import type { SinglePostProps } from "@models/NavTypes";

//style
import { CloseButton, OutlineButton } from "@components/styles/button";
import { SCREEN_WIDTH } from "@components/styles/theme/layout";
import { STATUS_BAR_HEIGHT } from "src/config/const";
//function
import { _timeAgo } from "@functions/_timeAgo";
import { _takasaPost } from "@functions/_takasaPost";
//redux
import { useAppSelector } from "@Redux/hook";
import { selectSinglePostById } from "@Redux/postsSlice";

import { LoadingView } from "@components/styles/LoadingView";

export const SinglePostPage: FC<SinglePostProps> = ({ navigation, route }) => {
  const { postId } = route.params;

  const post = useAppSelector((state) => selectSinglePostById(state, postId));

  if (!post) {
    return <LoadingView />;
  }

  const _takasa = _takasaPost({
    imageH: post.imageH,
    imageW: post.imageW
  });

  const timeAgo = _timeAgo(post.postedAt);

  return (
    <>
      <StatusBar hidden />

      <View flex={1}>
        <View
          style={{
            height: STATUS_BAR_HEIGHT + 30,
            top: 0,
            opacity: 0.8
          }}
        />

        <PostHeader item={post} timeAgo={timeAgo} />
        <Image
          style={{ width: SCREEN_WIDTH, height: _takasa }}
          source={{ uri: post.postedImage }}
          resizeMode="contain"
        />

        <Text style={{ fontSize: 15, marginTop: 20, alignSelf: "center" }}>
          {post.comment}
        </Text>
        {post.product && (
          <View width={"100%"} mt={5}>
            <OutlineButton
              onPress={() => navigation.navigate("WebShop")}
              title=" 詳細をオンラインショップでみる"
            />
          </View>
        )}
      </View>
      <View style={{ alignItems: "center", bottom: 10 }}>
        <CloseButton />
      </View>
    </>
  );
};

export default SinglePostPage;
