import React, { useState } from "react";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";

import { Center, Text, View, Icon, ScrollView } from "native-base";

//functions--------------------------------------------------------
import * as PickImage from "@functions/_pickImage";
//3rd party------------------------------------------------------
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import DropDownPicker from "react-native-dropdown-picker";
//redux--------------------------------------------------------------
import { useAppDispatch, useAppSelector } from "@Redux/hook";
import { unwrapResult } from "@reduxjs/toolkit";
import { addEvent } from "@Redux/eventActions";

//style-------------------------------------------------------------------
import type { category, EventType } from "@models/EventType";
import Spacer from "@components/styles/Spacer";
import basicStyles from "@components/styles/theme/basicStyleSheet";
import InputFieldTwo from "@components/styles/InputFieldTwo";
import {
  PhotoWrapper,
  PostImage,
  _width
} from "@components/styles/pageStyle/AddPostStyle";

import { OutlineButton } from "@components/styles/button";

interface FormInput {
  title: string;
  eventURL: string;
  category: string;
}

const categories = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" }
];

export const AddEventPage = () => {
  const dispatch = useAppDispatch();
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [imageData, setImageData] = useState<ImagePicker.ImagePickerAsset>();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const [open, setOpen] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormInput>();

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
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.0
      });
      console.log("ログ出し中", result);
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
        setAddRequestStatus("pending");
        await PickImage.uploadImage(
          imageData?.uri,
          `eventImages/${data.title}`,
          data.title
        );

        Alert.alert("Storageに画像を追加しました。");

        const postedData = {
          title: data.title,
          eventImage: imageData?.uri,
          eventURL: data.eventURL,
          category: data.category
        } as EventType;
        console.log("postedDataは:", postedData);

        const resultAction = await dispatch(addEvent(postedData));
        unwrapResult(resultAction);
      } catch (error) {
        Alert.alert("エラーです。もう一度お願いします。");
        console.log("エラー:", error);
      } finally {
        setAddRequestStatus("idle");
        // onSaveClick(false);
      }
    }
  };

  return (
    <ScrollView>
      {/* <Spacer /> */}
      <Center mt={5}>
        <Text>イベント記事を投稿</Text>
      </Center>
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
            <PostImage source={{ uri: imageData?.uri }} />
          </PhotoWrapper>
          {/* タイトル=========================================== */}
          <Controller
            defaultValue=""
            control={control}
            name="title"
            rules={{
              required: true
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <InputFieldTwo
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                // placeholder="タイトル"
                title="タイトル"
              />
            )}
          />
          {errors.title && (
            <Text style={basicStyles.warningText}>
              タイトルの入力が必要です
            </Text>
          )}

          {/* イベントURL ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */}
          <Spacer />
          <Controller
            defaultValue=""
            control={control}
            name="eventURL"
            rules={{
              required: true
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <InputFieldTwo
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                // placeholder="イベントURL"
                title="イベントURL"
              />
            )}
          />
          {errors.eventURL && (
            <Text style={basicStyles.warningText}>
              イベントURLの入力が必要です
            </Text>
          )}

          {/* カテゴリー選択＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */}
          <Spacer />
          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, value } }) => (
              <DropDownPicker
                value={value}
                items={categories}
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
            name="category"
          />
          {errors.category && (
            <Text style={basicStyles.warningText}>
              categoryを選択してください
            </Text>
          )}
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

export default AddEventPage;
