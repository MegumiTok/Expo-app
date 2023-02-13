import { Image } from "react-native";
import { Text, View, StatusBar } from "native-base";
// import Svg, { Path } from "react-native-svg";

//templates---------------------------------------------------------------
import PostHeader from "@components/PostHeader";

//type-------------------------------------------------------------
import type { FC } from "react";
import type { SinglePostProps } from "@models/NavTypes";

//style--------------------------------------------------------------

import { CloseButton, OutlineButton } from "@components/styles/button";
import { SCREEN_WIDTH, PHOTO_HEIGHT } from "@components/styles/theme/layout";
import { STATUS_BAR_HEIGHT } from "src/config/const";
//ローカル==========================
// import { posts } from "@assets/data/posts";
//function========================
import { _timeAgo } from "@functions/_timeAgo";
import { _takasaPost } from "@functions/_takasaPost";
//redux=========================
import { useAppSelector } from "@Redux/hook";
import { selectSinglePostById } from "@Redux/postsSlice";

//Context========================
// import useUser from "@hooks/useUser";

import { LoadingView } from "@components/styles/LoadingView";

export const SinglePostPage: FC<SinglePostProps> = ({ navigation, route }) => {
  const { postId } = route.params;
  console.log("postId: ", postId);

  const post = useAppSelector((state) => selectSinglePostById(state, postId));

  // const post = posts.find((post) => post.postId === postId);
  // console.log("postは: ", post);

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
            // backgroundColor: Colors.primary.dark,
            top: 0,
            opacity: 0.8
          }}
        />
        {/* <View
          style={{
            width: SCREEN_WIDTH,
            height: STATUS_BAR_HEIGHT,
            backgroundColor: "tomato"
          }}
        >
          <Svg
            width="100%"
            height="100%"
            opacity="0.8"
            viewBox="0 0 1440 320"
            // viewBox={`0 0 ${originalWidth} ${originalHeight}`}>
            style={{
              top: -5
            }}
          >
            <Path
              fill={Colors.primary.dark}
              d="M0,224L40,218.7C80,213,160,203,240,165.3C320,128,400,64,480,69.3C560,75,640,149,720,160C800,171,880,117,960,122.7C1040,128,1120,192,1200,213.3C1280,235,1360,213,1400,202.7L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
            />
          </Svg>
        </View> */}

        <PostHeader item={post} timeAgo={timeAgo} />
        {/* <View marginRight={5}>
          <Text style={{ alignSelf: "flex-end" }}> {timeAgo}</Text>
        </View> */}
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
        {/* <ReactionButtons item={post} /> */}
        {/* {user && post.creatorId === user.userId && (
          <Button
            color={Colors.secondary.general}
            onPress={() => navigation.navigate("EditPost", { postId })}
            variant="ghost"
          >
            投稿を編集する
          </Button>
        )} */}
      </View>
      <View style={{ alignItems: "center", bottom: 10 }}>
        <CloseButton />
      </View>
    </>
  );
};

export default SinglePostPage;
