import { View, Center } from "native-base";
import {
  FlatList,
  Pressable,
  ImageBackground,
  Text,
  StyleSheet
} from "react-native";
import {
  SPACING_SQUARE,
  SPACING_SQUARE_SIZE,
  FONT_SIZE_LG
} from "@components/styles/theme/layout";
import { Colors } from "@components/styles/theme/Colors";
import { useNavigation } from "@react-navigation/native";

import { Routes } from "@models/NavTypes";
import { GENRE_LIST } from "@assets/data/genres";

export const GenreList = () => {
  const { navigate } = useNavigation();
  const _renderItem = ({ item }) => {
    return (
      <Pressable
        style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
        onPress={() => {
          navigate(Routes.SelectedGenreList, {
            name: item.name
          });
        }}
      >
        <ImageBackground
          source={{ uri: item.img }}
          style={{
            width: SPACING_SQUARE_SIZE,
            height: SPACING_SQUARE_SIZE,
            margin: SPACING_SQUARE,
            backgroundColor: Colors.primary.dark
          }}
          imageStyle={{ resizeMode: "contain", opacity: 0.5 }}
        >
          <Center flex={1}>
            <Text style={styles.text}>{item.name}</Text>
          </Center>
        </ImageBackground>
      </Pressable>
    );
  };
  return (
    <View>
      <FlatList
        data={GENRE_LIST}
        keyExtractor={(_, index) => index.toString()}
        renderItem={_renderItem}
        numColumns={2}
      />
    </View>
  );
};

export default GenreList;

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: FONT_SIZE_LG,
    fontWeight: "800"
  }
});
