import { useEffect, useState } from "react";
import { TouchableWithoutFeedback, Alert } from "react-native";
import { VStack, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
// import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

//styles------------------------------------------------
import {
  LeftParts,
  AvatarContainer,
  AvatarImage,
  CreatorInfoContainer,
  StyledText,
  ContainerHeader
} from "@components/styles/pageStyle/FeedStyle";
import BorderGradient from "./styles/BorderGradient";
// firebase----------------------------
import { getDocs, doc, getDoc } from "firebase/firestore";
import { allUsersColRef, db } from "src/config/firebase";
import { ALL_USERS } from "src/config/const";
//type--------------------------------------------
import type { Post } from "@models/PostTypes";
import type { Auth } from "@models/AuthTypes";

export const FeedPostHeader = ({ item }: { item: Post }) => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState<Auth>();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchCreators = async () => {
  //     try {
  //       const list = [] as Auth[];
  //       const querySnapshot = await getDocs(allUsersColRef);
  //       querySnapshot.forEach((doc) => {
  //         const {
  //           createdAt,
  //           email,
  //           mainComment,
  //           userFlg,
  //           userId,
  //           userName,
  //           userPhoto,
  //           updatedAt
  //         } = doc.data();

  //         list.push({
  //           createdAt,
  //           email,
  //           mainComment,
  //           userFlg,
  //           userId,
  //           userName,
  //           userPhoto,
  //           updatedAt
  //         });
  //       });
  //       setUserData(list);
  //       console.log("リスト", list);

  //       if (loading) {
  //         setLoading(false);
  //       }
  //     } catch (e) {
  //       Alert.alert("fetchPostsに失敗しました。");
  //       console.log("エラー:", e);
  //     }
  //   };

  //   fetchCreators(); //async functionを使っているのでこのような書き方になる
  // }, [loading]); //🔴dependency array.を外したらuseEffectが永遠ループに入った
  return (
    <ContainerHeader>
      <LeftParts>
        <AvatarContainer>
          <BorderGradient width={47} height={47} stroke={6} />
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("CreatorTab", {
                screen: "Profile",
                params: { item }
              })
            }
          >
            <AvatarImage source={{ uri: item.creatorPhoto }} />
          </TouchableWithoutFeedback>
        </AvatarContainer>
        <CreatorInfoContainer>
          <VStack
            //🔴スタイル修正必要
            style={{ paddingTop: 8 }}
          >
            <StyledText>{item.creatorName}</StyledText>
            <Text fontSize="xs" pl={1}>
              {item.genre}
            </Text>
          </VStack>

          {/* <Genres
            genres={item.genre}
            iconSize={12}
            fontSize={10}
            spacing={0}
          /> */}
        </CreatorInfoContainer>
      </LeftParts>

      <Menu>
        <MenuTrigger>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={30}
            color="black"
          />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            onSelect={() => {
              // navigate("Update");
            }}
            text="編集"
          />
          <MenuOption onSelect={() => true}>
            <Text>削除</Text>
          </MenuOption>
          {/* <MenuOption onSelect={() => true} text="共有" /> */}
        </MenuOptions>
      </Menu>
    </ContainerHeader>
  );
};

export default FeedPostHeader;
