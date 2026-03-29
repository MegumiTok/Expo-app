import { useContext } from "react";
import {
  TouchableWithoutFeedback,
  Alert,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { VStack, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { Routes } from "@models/NavTypes";

import {
  LeftParts,
  AvatarContainer,
  AvatarImage,
  CreatorInfoContainer,
  StyledText,
  ContainerHeader
} from "@components/styles/pageStyle/FeedStyle";
import BorderGradient from "./styles/BorderGradient";
import { AuthContext } from "@navigation/AuthProvider";
import { Colors } from "@components/styles/theme/Colors";
//redux --------------------------------
import { useAppDispatch } from "@Redux/hook";
import { deletePost } from "@Redux/postActions";

//type--------------------------------------------
import type { Post } from "@models/PostTypes";

export const FeedPostHeader = ({ item }: { item: Post }) => {
  const { user } = useContext(AuthContext);
  const dispatch = useAppDispatch();

  const navigation = useNavigation();

  const handleDeletePost = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this post?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            dispatch(deletePost(item.postId));
            // Alert.alert("ポストを削除しました");
          }
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No"
        }
      ]
    );
  };
  return (
    <ContainerHeader>
      <LeftParts>
        <AvatarContainer>
          <BorderGradient width={50} height={50} stroke={9} />
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

      {/* 投稿者だけに表示 ======================================================*/}
      {user?.uid === item.creatorId && (
        <View style={styles.manuWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate(Routes.EditPost, { item });
            }}
          >
            <Entypo name="edit" size={28} color={Colors.editIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleDeletePost}>
            <FontAwesome5 name="trash" size={25} color={Colors.deleteIcon} />
          </TouchableOpacity>
        </View>
      )}
    </ContainerHeader>
  );
};

export default FeedPostHeader;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
    // backgroundColor: Colors.secondary.general
  },
  manuWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 68,
    marginHorizontal: 10
  }
});
