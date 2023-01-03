import React, { useState } from "react";
import {
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet
} from "react-native";

import { Center, Text, View, ScrollView } from "native-base";
import { Routes } from "@models/NavTypes";
//3rd party------------------------------------------------------

import { useForm, Controller } from "react-hook-form";

//redux--------------------------------------------------------------
import { useAppDispatch } from "@Redux/hook";
import { unwrapResult } from "@reduxjs/toolkit";
import { addEvent } from "@Redux/eventActions";

//style-------------------------------------------------------------------
import type { EventType } from "@models/EventType";
import Spacer from "@components/styles/Spacer";
import basicStyles from "@components/styles/theme/basicStyleSheet";
import InputFieldTwo from "@components/styles/InputFieldTwo";
import { _width } from "@components/styles/pageStyle/AddPostStyle";

import { OutlineButton } from "@components/styles/button";

interface FormInput {
  title: string;
  eventURL: string;
  category: string;
}

const categories = [
  { label: "Pokémon", value: "Pokémon" },
  { label: "Hunter × Hunter", value: "Hunter × Hunter" },
  { label: "Attack on Titan", value: "Attack on Titan" }
];

export const AddEventPage = ({ navigation }) => {
  const dispatch = useAppDispatch();
  // const [galleryPermission, setGalleryPermission] = useState(null);
  // const [imageData, setImageData] = useState<ImagePicker.ImagePickerAsset>();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const [open, setOpen] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormInput>();

  // const handlePickImage = async () => {
  //   if (!galleryPermission) {
  //     const galleryStatus = await PickImage.askLibraryPermission();
  //     if (galleryStatus !== "granted") {
  //       Alert.alert("アルバムへのアクセス許可をください");
  //     }
  //     setGalleryPermission(galleryStatus.status === "granted");
  //     if (!galleryStatus) return;
  //   }
  //   try {
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.All,
  //       allowsEditing: true,
  //       aspect: [1, 1],
  //       quality: 0.0
  //     });
  //     console.log("ログ出し中", result);
  //     if (!result.canceled) {
  //       const img = result.assets[0];
  //       setImageData(img);
  //     }
  //   } catch (error) {
  //     Alert.alert("エラーで投稿できませんでした");
  //   }
  // };

  // const canSave = Boolean(imageData) && addRequestStatus === "idle";
  const canSave = addRequestStatus === "idle";

  const onPressSaveButton = async (data: FormInput) => {
    console.log("追加されたデータ:", data);

    if (canSave) {
      try {
        // setAddRequestStatus("pending");
        // await PickImage.uploadImage(
        //   imageData?.uri,
        //   `eventImages/${data.title}`,
        //   data.title
        // );

        // Alert.alert("Storageに画像を追加しました。");

        const postedData = {
          title: data.title,
          // eventImage: imageData?.uri,
          eventURL: data.eventURL,
          category: data.category
        } as EventType;
        console.log("postedDataは:", postedData);

        const resultAction = await dispatch(addEvent(postedData));
        Alert.alert("イベントが投稿されました");
        unwrapResult(resultAction);
        navigation.navigate(Routes.EventList);
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
    <>
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
            {/* <PhotoWrapper onPress={handlePickImage}>
            <Icon
              as={MaterialCommunityIcons}
              name="camera-plus-outline"
              color="black"
              style={{ position: "absolute", top: _width / 2 }}
              size="md"
            />
            <PostImage source={{ uri: imageData?.uri }} />
          </PhotoWrapper> */}
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
          </Center>
        </TouchableWithoutFeedback>
      </ScrollView>
      {/* 投稿ボタンーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー */}
      <View style={styles.button}>
        <OutlineButton
          onPress={() => {
            reset({
              title: "",
              eventURL: "https://www.kashimayari.net/snow/snowadventure/",
              category: ""
            });
          }}
          title="リセット"
        />
        <Spacer />
        <OutlineButton
          onPress={handleSubmit(onPressSaveButton)}
          title="投稿"
          disabled={!canSave}
        />
      </View>
    </>
  );
};

export default AddEventPage;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
    marginTop: 5,
    width: "100%"
  }
});
