import { useState } from "react";
import { View, Image } from "native-base";
import { FlatList, RefreshControl } from "react-native";
import {
  SPACING_SQUARE,
  SPACING_SQUARE_SIZE
} from "@components/styles/theme/layout";

//redux==============================
import { useAppDispatch, useAppSelector } from "@Redux/hook";
import { selectLikedPost } from "@Redux/postsSlice";
import { fetchAllPosts, updateLike } from "@Redux/postActions";
export const FavList = ({ route }) => {
  const dispatch = useAppDispatch();
  const _favs = useAppSelector((state) => selectLikedPost(state));

  const [refreshing, setRefreshing] = useState(false);

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
  const _renderItem = ({ item }) => {
    return (
      <View>
        <Image
          style={{
            width: SPACING_SQUARE_SIZE,
            height: SPACING_SQUARE_SIZE,
            margin: SPACING_SQUARE
          }}
          source={{ uri: item.postedImage }}
          resizeMode="contain"
          alt="post"
        />
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={_favs}
        keyExtractor={(_, index) => index.toString()}
        renderItem={_renderItem}
        numColumns={2}
        // refreshing={refreshing}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
        // }
      />
    </View>
  );
};

export default FavList;
