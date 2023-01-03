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
  SPACING_SQUARE_SIZE
} from "@components/styles/theme/layout";
import { Colors } from "@components/styles/theme/Colors";
import { useNavigation } from "@react-navigation/native";

import { Routes } from "@models/NavTypes";

export const _genre = [
  {
    id: 1,
    name: "フリージャンル",
    img: "https://1.bp.blogspot.com/-61AaetRYALc/XQsQpwUB63I/AAAAAAABTVg/FY_ecihvW60JCY_hyKL4J35-R8FK3L20QCLcBGAs/w1200-h630-p-k-no-nu/building_yorozuya.png"
  },
  {
    id: 2,
    name: "お絵かき",
    img: "https://1.bp.blogspot.com/-jiolS-FKKN4/Wj4IgwKAU3I/AAAAAAABJMY/la-WBl6fTAgkf_hM-3GXWu0r0iT7TrRWgCLcBGAs/s800/happyou_picture_boy.png"
  },
  {
    id: 3,
    name: "食べ物",
    img: "https://3.bp.blogspot.com/-LgZiIfVhI6o/WK7e0Cz6vHI/AAAAAAABB-8/1TJfyzBMqnoac_yHNBsd4vcI-I_t1twqwCLcB/s800/fruit_mikan_set.png"
  },
  {
    id: 4,
    name: "アニメ/マンガ",
    img: "https://4.bp.blogspot.com/-bT8YdNC856Q/WZP3lL87D2I/AAAAAAABF_k/daOTZl5hLu4UqGFGvYaDczC1PbSxTxWiwCLcBGAs/s800/manga_genkou.png"
  },
  {
    id: 5,
    name: "キャラクター",
    img: "https://4.bp.blogspot.com/-um893sFMusE/W64DQdGEAMI/AAAAAAABPFU/hjueJMU_EEgevjp-rQDl6_XaVuP6zNFegCLcBGAs/s800/animal_stand_kaeru.png"
  },
  {
    id: 6,
    name: "お知らせ",
    img: "https://4.bp.blogspot.com/-PjLKunvx8yA/ViipHlJ4JsI/AAAAAAAAzwI/OSGrrieq11A/w1200-h630-p-k-no-nu/text_oshirase.png"
  }
];

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
          //   console.log(item);
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
        {/* </View> */}
      </Pressable>
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

export default GenreList;

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "800"
  }
});
