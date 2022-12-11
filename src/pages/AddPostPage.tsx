import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";

import {
  Center,
  Text,
  View,
  HStack,
  Icon,
  Button,
  ScrollView
} from "native-base";
import uuid from "react-native-uuid";
import { TEST_IMAGE, CREATORS_POSTS, GENRES } from "src/config/const";
//3rd party------------------------------------------------------
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import Modal from "react-native-modal";
//
// import Select from "react-select"; //React Nativeで使えない (>.<)
//
import { useForm, Controller } from "react-hook-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";
//firebase------------------------------------------------------------
import { serverTimestamp, doc, setDoc, addDoc } from "firebase/firestore";
import { postsColRef, db } from "src/config/firebase";
//Context--------------------------------------------------------
import useUser from "@hooks/useUser";

//type-----------------------------------------------------------------
import type { ItemType } from "react-native-dropdown-picker";
import type { Post } from "@models/PostTypes";

//functions--------------------------------------------------------
import * as PickImage from "@functions/_pickImage";

//style-------------------------------------------------------------------
import Spacer from "@components/styles/Spacer";
import basicStyles from "@components/styles/theme/basicStyleSheet";
import {
  StyledTextInput,
  PhotoWrapper,
  PostImage,
  _width
} from "@components/styles/pageStyle/AddPostStyle";
import { OutlineButton } from "@components/styles/button";

interface FormInput {
  comment: string;
  genre: string;
  product: boolean;
}
export const AddPostPage = () => {
  // const [postedImage, setPostedImage] = useState("");

  const [imageData, setImageData] = useState<ImagePicker.ImagePickerAsset>();

  const [open, setOpen] = useState<boolean>(false);
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const { user } = useUser();
  //   const genres = useAppSelector((state) => state.genre);
  //   const items: ItemType[] = genres;

  const [items, setItems] = useState(GENRES);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [5, 4],
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
        if (!user) {
          return null;
        }

        const randomId = uuid.v4();

        setAddRequestStatus("pending");
        const { fileName } = await PickImage.uploadImage(
          imageData?.uri,
          `postImages/${user.displayName}`,
          randomId //複数投稿があるので名前は変動型にすべき
        );

        Alert.alert("Storageに画像を追加しました。");

        const postedData = {
          creatorName: user.displayName,
          creatorPhoto: user.photoURL, //投稿時はログインしているのだからこれでいい
          date: serverTimestamp(),
          genre: data.genre,
          comment: data.comment,
          postedImage: imageData?.uri,
          imageW: imageData?.width,
          imageH: imageData?.height,
          isLiked: false,
          reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            clap: 0,
            surprise: 0
          },
          product: data.product || false,
          creatorId: user.uid,
          postId: randomId
          // updatedAt
        } as Post;
        console.log("postedDataは:", postedData);
        try {
          //When you use set() to create a document, you must specify an ID for the document to create.
          //In some cases, it can be useful to create a document reference with an auto-generated ID, then use the reference later. For this use case, you can call doc():
          const postRef = doc(postsColRef);
          await setDoc(postRef, postedData);
          // console.log("Document written with ID: ", postRef.id);

          // const userRef = doc(db, CREATORS_POSTS, postedData.postId);
          // await setDoc(userRef, postedData);
        } catch (error) {
          Alert.alert("Firestoreに保存を失敗しました");
          console.log("Firestoreに保存を失敗しました", error); //<-- これでエラー内容確認
        }
      } catch (error) {
        Alert.alert("エラーです。もう一度お願いします。");
      } finally {
        setAddRequestStatus("idle");
        // onSaveClick(false);
      }
    }
  };

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
            <PostImage source={{ uri: imageData?.uri }} />
          </PhotoWrapper>
          {/* コメント＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */}
          <Button onPress={toggleModal}>コメントをかく</Button>
          <Modal isVisible={isModalVisible}>
            <Center pt={10}>
              <Button onPress={toggleModal}>閉じる</Button>
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
                  コメントの入力お願いします！
                </Text>
              )}
            </Center>
          </Modal>
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
                items={items}
                open={open}
                setValue={(value) => {
                  onChange(value);
                }}
                onChangeValue={(value) => {
                  onChange(value);
                }}
                setOpen={setOpen}
                setItems={setItems}
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
