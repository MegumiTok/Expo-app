import { Image } from "react-native";
import { Center, Text, View, Button, StatusBar, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";

//templates---------------------------------------------------------------
// import { ReactionButtons } from "@components/templates/ReactionButtons";
// import TimeAgo from "@components/templates/TimeAgo";
import PostHeader from "@components/PostHeader";

//type-------------------------------------------------------------
import type { FC } from "react";
import type { SinglePostProps } from "@models/NavTypes";

//style--------------------------------------------------------------
import { Colors } from "@components/styles/theme/Colors";
import { CloseButton, OutlineButton } from "@components/styles/button";
import { SCREEN_WIDTH, PHOTO_HEIGHT } from "@components/styles/theme/layout";

//ローカルーーーーーーーーーーーーーーーーーーー
import { posts } from "@assets/data/posts";
//function-------------------------------
import { _timeAgo } from "@functions/_timeAgo";
//redux--------------------------------------------------------
import { useAppSelector } from "@Redux/hook";
import { selectSinglePostById } from "@Redux/postsSlice";
import useUser from "@hooks/useUser";
import Spacer from "@components/styles/Spacer";
// import { selectCurrentUser } from "@modules/redux/authSlice";

export const SinglePostPage: FC<SinglePostProps> = ({ navigation, route }) => {
  const { postId } = route.params;
  console.log("postId: ", postId);
  const { user } = useUser();
  const post = useAppSelector((state) => selectSinglePostById(state, postId));
  // const post = posts.find((post) => post.postId === postId);
  // console.log("postは: ", post);

  if (!post) {
    return (
      <Center flex={1}>
        <Center>
          <Text> postがありません</Text>
        </Center>
      </Center>
    );
  }
  const calculatedMaxH = Math.round((SCREEN_WIDTH * post.imageH) / post.imageW); //実際ポストされるのサイズに計算

  const _takasa: number =
    calculatedMaxH < PHOTO_HEIGHT ? calculatedMaxH : PHOTO_HEIGHT;

  const timeAgo = _timeAgo(post.postedAt);
  return (
    <>
      <StatusBar hidden />
      <View flex={1}>
        {/* <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 5 }}>
        {post.comment}
      </Text> */}
        <View margin={5} />

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
