import { View, Image } from "native-base";
import { FlatList } from "react-native";
import {
  SPACING_SQUARE,
  SPACING_SQUARE_SIZE
} from "@components/styles/theme/layout";

//redux==============================
import { useAppSelector } from "@Redux/hook";
import { selectPostsByGenre } from "@Redux/postsSlice";
export const SelectedGenreList = ({ route }) => {
  const { name } = route.params;

  const _genre = useAppSelector((state) => selectPostsByGenre(state, name));
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
        data={_genre}
        keyExtractor={(_, index) => index.toString()}
        renderItem={_renderItem}
        numColumns={2}
      />
    </View>
  );
};

export default SelectedGenreList;
