import React, { useState, useEffect } from "react";
import Checkbox from "expo-checkbox";
import { Alert, TouchableWithoutFeedback, Keyboard, Image } from "react-native";

import { Center, Text, View, HStack, Icon, ScrollView } from "native-base";

import { GENRES } from "src/config/const";
import { Routes } from "@models/NavTypes";
//3rd party------------------------------------------------------
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";

//
// import Select from "react-select"; //React Nativeで使えない (>.<)
//
import { useForm, Controller } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//redux--------------------------------------------------------------
import { useAppDispatch, useAppSelector } from "@Redux/hook";
import "react-native-get-random-values";
import { createNewPost } from "@Redux/postActions";
import { unwrapResult, nanoid } from "@reduxjs/toolkit";
//Context--------------------------------------------------------
import useUser from "@hooks/useUser";

//type-----------------------------------------------------------------
import type { Post } from "@models/PostTypes";

//functions--------------------------------------------------------
import * as PickImage from "@functions/_pickImage";
import { _takasaPost } from "@functions/_takasaPost";
//style-------------------------------------------------------------------
import Spacer from "@components/styles/Spacer";
import basicStyles from "@components/styles/theme/basicStyleSheet";
import {
  StyledTextInput,
  PhotoWrapper,
  _width,
  PostImage
} from "@components/styles/pageStyle/AddPostStyle";
import { OutlineButton } from "@components/styles/button";
import { SCREEN_WIDTH } from "@components/styles/theme/layout";

interface FormInput {
  comment: string;
  genre: string;
  product: boolean;
}
export const AddPostPage = ({ navigation }) => {
  // const [postedImage, setPostedImage] = useState("");
  const dispatch = useAppDispatch();
  const genres = useAppSelector((state) => state.genre);

  const [imageData, setImageData] = useState<ImagePicker.ImagePickerAsset>();

  const [open, setOpen] = useState<boolean>(false);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [takasa, setTakasa] = useState<number>();
  const { user } = useUser();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormInput>();

  //追加すべき？（画像登録処理があるため）
  // const postStatus = useAppSelector((state) => state.posts.status);
  // const postError = useAppSelector((state) => state.posts.error);

  const handlePickImage = async () => {
    if (!galleryPermission) {
      const galleryStatus = await PickImage.askLibraryPermission();
      if (galleryStatus !== "granted") {
        Alert.alert("アルバムへのアクセス許可をください");
      }
      setGalleryPermission(galleryStatus.status === "granted");
      if (!galleryStatus) return;
    }
    try {
      //An array with two entries [x, y] specifying the aspect ratio to maintain if the user is allowed to edit the image (by passing allowsEditing: true).
      //This is only applicable on Android, since on iOS the crop rectangle is always a square.
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, //only Android
        aspect: [1, 1], //only Android
        quality: 0.0 //pngには意味がない
      });
      // console.log("投稿写真", result);
      //このログを出すといかのようなwarnが出るがこれはログ内にcancelledが含まれているため。なので無視してok。
      //Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead
      if (!result.canceled) {
        const img = result.assets[0];
        setImageData(img);
      }
    } catch (error) {
      Alert.alert("エラーで投稿できませんでした");
    }
  };

  const canSave = Boolean(imageData) && addRequestStatus === "idle";

  const onPressSaveButton = async (data: FormInput) => {
    console.log("追加されたデータ:", data);

    if (canSave) {
      try {
        if (!user) {
          return null;
        }

        // const chars =
        //   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        // let randomId = "";
        // for (let i = 0; i < 8; i++) {
        //   randomId += chars.charAt(Math.floor(Math.random() * chars.length));
        // }
        if (!imageData) {
          //canSaveの確認でundefineでないことは確認しているが型チェックのため書いている
          console.log("HELLO");
          return null;
        }

        const randomId = nanoid();

        setAddRequestStatus("pending");
        await PickImage.uploadImage(
          imageData.uri,
          `postImages/${user.displayName}`,
          randomId //複数投稿があるので名前は変動型にすべき
        );

        Alert.alert("Storageに画像を追加しました。");

        const postedData = {
          creatorName: user.displayName,
          creatorPhoto: user.photoURL, //投稿時はログインしているのだからこれでいい

          genre: data.genre,
          comment: data.comment,
          postedImage: imageData?.uri,
          imageW: imageData.width,
          imageH: imageData.height,
          isLiked: false,

          product: data.product || false,

          creatorId: user.uid,
          postId: randomId
          // updatedAt
        } as Post;
        // console.log("postedDataは:", postedData);
        console.log("height:", postedData.imageH);
        console.log("width:", postedData.imageW);

        const resultAction = await dispatch(createNewPost(postedData));
        unwrapResult(resultAction);
        navigation.navigate(Routes.Feed);
      } catch (error) {
        Alert.alert("エラーです。もう一度お願いします。");
      } finally {
        setAddRequestStatus("idle");
        // onSaveClick(false);
      }
    }
  };

  useEffect(() => {
    //useEffectを使わないでuseStateを使うとinfante loopに入った
    if (imageData) {
      const _takasa = _takasaPost({
        imageH: imageData.height,
        imageW: imageData.width
      });
      // console.log("_takasa", _takasa);
      setTakasa(_takasa);
    }
  }, []); //emptyにすること（一回のみ実行したいので）

  return (
    <ScrollView>
      {/* <Spacer /> */}
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <Center p={5}>
          {/* 写真を選ぶ ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝*/}
          <PhotoWrapper onPress={handlePickImage}>
            <Icon
              as={MaterialCommunityIcons}
              name="camera-plus-outline"
              color="black"
              style={{ position: "absolute", top: _width / 2 }}
              size="md"
            />
            {imageData && (
              <Image
                source={{ uri: imageData.uri }}
                style={{ width: SCREEN_WIDTH, height: takasa }}
                // style={{ width: imageData.width, height: imageData.height }}//こっちのデザインでもありだとは思う（小さい画像を選択すると見にくいが）
              />
            )}

            {!imageData && <PostImage />}
          </PhotoWrapper>
          {/* コメント＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */}
          <View>
            <Controller
              defaultValue=""
              control={control}
              name="comment"
              rules={{
                required: true
              }}
              render={({ field: { onChange, value, onBlur } }) => (
                <StyledTextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="ひとこと書いてください"
                  autoCapitalize="none"
                  autoCorrect={false}
                  multiline
                  defaultValue={value} //足してみた
                />
              )}
            />
            {errors.comment && (
              <Text style={basicStyles.warningText}>
                コメントの入力が必要です
              </Text>
            )}
          </View>
          {/* ジャンル＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */}
          <Spacer />
          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, value } }) => (
              <DropDownPicker
                value={value}
                items={genres}
                open={open}
                setValue={(value) => {
                  onChange(value);
                }}
                onChangeValue={(value) => {
                  onChange(value);
                }}
                setOpen={setOpen}
                // setItems={setItems}
              />
            )}
            name="genre"
          />

          {/* 商品化あり・なしチェックボックス＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */}
          <HStack justifyContent="center" alignItems="center">
            <Text>商品はチェックしてください</Text>
            <Controller
              control={control}
              // rules={{
              //   required: true,
              // }}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  style={{ margin: 8 }}
                  value={value}
                  onValueChange={(value) => onChange(value)}
                  color={value ? "#4630EB" : undefined}
                />
              )}
              name="product"
            />
          </HStack>

          {/* 投稿ボタンーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー */}

          <View width={"100%"} mt={5}>
            <OutlineButton
              onPress={handleSubmit(onPressSaveButton)}
              title="投稿"
              disabled={!canSave}
            />
          </View>
        </Center>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default AddPostPage;
