import { View, Image } from "native-base";
import { FlatList } from "react-native";
import {
  SPACING_SQUARE,
  SPACING_SQUARE_SIZE
} from "@components/styles/theme/layout";

//redux==============================
import { useAppSelector } from "@Redux/hook";
import { selectProducts } from "@Redux/postsSlice";

export const ProductList = () => {
  const _products = useAppSelector((state) => selectProducts(state));

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
          resizeMode="cover"
          alt="post"
        />
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={_products}
        keyExtractor={(_, index) => index.toString()}
        renderItem={_renderItem}
        numColumns={2}
      />
    </View>
  );
};

export default ProductList;
