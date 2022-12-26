import { useEffect, useState, useContext } from "react";
import { TouchableWithoutFeedback, Alert } from "react-native";
import { VStack, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
// import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesome } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";
import { Routes } from "@models/NavTypes";
//styles------------------------------------------------
import type { FC } from "react";

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
//redux --------------------------------
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@Redux/hook";
import { deletePost } from "@Redux/postActions";

//type--------------------------------------------
import type { Post } from "@models/PostTypes";
import type { Auth } from "@models/AuthTypes";

export const FeedPostHeader = ({ item }: { item: Post }) => {
  const { user } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const creator = useAppSelector((state) => state.creators.currentCreator);

  const navigation = useNavigation();
  // const postId = item.postId;

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
  // console.log("出力1", creator?.creatorId);
  // console.log("出力2", user?.uid);
  // console.log("出力3", item.creatorId);

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

      {/* 投稿者だけに表示 ======================================================*/}
      {user?.uid === item.creatorId && (
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
              onSelect={() => navigation.navigate(Routes.EditPost, { item })}
              text="編集"
            />
            <MenuOption onSelect={handleDeletePost}>
              {/* <FontAwesome name="trash-o" size={22} /> */}
              <Text>削除</Text>
            </MenuOption>
            {/* <MenuOption onSelect={() => true} text="共有" /> */}
          </MenuOptions>
        </Menu>
      )}
    </ContainerHeader>
  );
};

export default FeedPostHeader;
