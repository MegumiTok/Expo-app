import { Image } from "react-native";
import { View, Text, Button, StatusBar, Icon } from "native-base";
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
import { CloseButton } from "@components/styles/button";
import { SCREEN_WIDTH, PHOTO_HEIGHT } from "@components/styles/theme/layout";

import { posts } from "@assets/data/posts";

export const SinglePostPage: FC<SinglePostProps> = ({ navigation, route }) => {
  const { postId } = route.params;
  //   console.log("1postId: ", postId);
  //   const user = useAppSelector(selectCurrentUser);
  //   const post = useAppSelector((state) => selectSinglePostById(state, postId));
  const post = posts.find((post) => post.postId === postId);
  //   console.log("postは: ", post);

  if (!post) {
    return (
      <View>
        <Text>投稿がありません</Text>
      </View>
    );
  }
  const calculatedMaxH = Math.round((SCREEN_WIDTH * post.imageH) / post.imageW); //実際ポストされるのサイズに計算

  const _takasa: number =
    calculatedMaxH < PHOTO_HEIGHT ? calculatedMaxH : PHOTO_HEIGHT;
  return (
    <>
      <StatusBar hidden />
      <View pt={10}>
        {/* <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 5 }}>
        {post.comment}
      </Text> */}
        <View flexDirection="row-reverse">
          <CloseButton />
        </View>
        {/* <View mb={15}> */}
        <PostHeader item={post} />
        {/* <TimeAgo timestamp={post.date} /> */}
        {/* </View> */}
        <Image
          style={{ width: SCREEN_WIDTH, height: _takasa }}
          source={{ uri: post.postedImage }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 15, marginTop: 20, alignSelf: "center" }}>
          {post.comment}
        </Text>
        {post.product && (
          <Button
            colorScheme="success"
            // leftIcon={
            //   <Icon name="shoppingcart" type="Ionicons" color="white" />
            // }
            variant="outline"
            onPress={() => navigation.navigate("WebShop")}
          >
            詳細をオンラインショップでみる
          </Button>
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
    </>
  );
};

export default SinglePostPage;
