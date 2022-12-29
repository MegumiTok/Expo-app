import { useState } from "react";
import {
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar
} from "react-native";
import { ScrollView, View, Text, Center } from "native-base";
import SearchBox from "@components/styles/SearchBox";
import { onlyItems } from "@assets/data/onlyItems";
import Constants from "expo-constants";
//styles------------------------------------------------
import basicStyles from "@components/styles/theme/basicStyleSheet";
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SPACING,
  SPACING_BIG
} from "@components/styles/theme/layout";
import { STATUS_BAR_HEIGHT } from "src/config/const";
const ITEM_WIDTH = SCREEN_WIDTH / 2 - SPACING;

export const SearchPage = () => {
  const [search, setSearch] = useState("");
  const searchDatas = onlyItems.find((post) => post.comment.includes(search));
  return (
    <View>
      <StatusBar hidden />
      <View
        style={{
          height: STATUS_BAR_HEIGHT,
          // backgroundColor: Colors.primary.general,
          top: 0
        }}
      />
      <ScrollView>
        <SearchBox
          title={"例: フラミンゴ　釣り"}
          onChangeText={setSearch}
          value={search}
        />
      </ScrollView>
      {searchDatas ? (
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View>
            <Image
              source={{ uri: searchDatas.postedImage }}
              style={style.resultImage}
            />
            <Center pt={5}>
              <Text style={basicStyles.basicText}>
                クリエイター名：{searchDatas.creatorName}
              </Text>
            </Center>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <Text>検索結果なし</Text>
      )}
    </View>
  );
};

export const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: 2
  },
  iconWrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
    width: "100%"
  },
  image: {
    height: ITEM_WIDTH * 1.25,
    width: ITEM_WIDTH
  },
  imageWrapper: {
    paddingBottom: SPACING_BIG
  },
  resultContainer: {
    backgroundColor: "rgba(52,52,52,0.8)",
    height: "100%",
    position: "absolute",
    width: "100%",
    zIndex: 1 //hold中の背景の色
  },
  resultImage: {
    height: "80%",
    width: "100%"
  },
  resultImageWrapper: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  resultItemWrapper: {
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 50,
    height: 465,
    left: SCREEN_WIDTH / 18,
    position: "absolute",
    top: SCREEN_HEIGHT / 6,
    width: SCREEN_WIDTH - SCREEN_WIDTH / 9,
    zIndex: 1
  }
});
