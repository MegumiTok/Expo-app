//このページでtype Auth の情報を入れていく

import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller } from "react-hook-form";
import { View, Text, Center, Icon, Circle } from "native-base";
import {
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  ScrollView
} from "react-native";

//const---------------------------------
import { TEST_IMAGE, ALL_USERS } from "src/config/const";
//+functions----------------------------
import { _inputStrictCheck } from "@functions/_inputStrictCheck";
import * as PickImage from "@functions/_pickImage";
//+styles-----------------------------
import { basicStyles } from "@components/styles/theme/basicStyleSheet";
import Spacer from "@components/styles/Spacer";
import { OutlineButton } from "@components/styles/button";
import { EditProfileStyle } from "@components/styles/pageStyle/EditProfileStyle";
import { StyledTextInput } from "@components/styles/pageStyle/AddPostStyle";

//context-----------------
import useUser from "@hooks/useUser";

// firebase----------------------------
import { db } from "src/config/firebase";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";

//type--------------------------------
import type { Auth } from "@models/AuthTypes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ErrorPage from "@components/ErrorPage";

// import { parseISO, formatDistanceToNow } from "date-fns";

interface FormInput {
  mainComment: string;
}

export const EditProfilePage = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState<Auth>();
  useEffect(() => {
    const getUser = async () => {
      try {
        if (!user?.displayName) {
          return null;
        }
        const docRef = doc(db, ALL_USERS, user.displayName);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          //   console.log("Document data:", docSnap.data());
          const result = docSnap.data() as Auth;
          //   const { userPhoto, mainComment } = docSnap.data();
          setUserData(result);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (e) {
        Alert.alert("プロファイル情報取得に失敗しました。");
        console.log("エラー:", e);
      }
    };
    getUser();
  }, [user.displayName]);

  const [imageData, setImageData] = useState<ImagePicker.ImageInfo>(
    {} as ImagePicker.ImageInfo
  );
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [galleryPermission, setGalleryPermission] = useState(null);

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
        setImageData(result);
      }
    } catch (error) {
      Alert.alert("エラーで投稿できませんでした");
    }
  };

  const canSave = Boolean(imageData) && addRequestStatus === "idle";

  //アップロードされるImageのuri
  const uploadImage = imageData.uri;

  const onPressSaveButton = async (data: FormInput) => {
    // console.log(data, "データ");

    if (canSave) {
      try {
        setAddRequestStatus("pending");
        // if (!user) {
        //   return null;
        // }

        console.log("user name", user?.displayName);

        const { filename } = await PickImage.uploadImage(
          uploadImage, //uri
          // `userAvatar/${user.displayName}`, //path アバター写真は一個しかないので一段階削除
          "userAvatar", //path
          user?.displayName //fName
        );
        console.log("ファイル名", filename);
        const authInfo = {
          userPhoto: uploadImage,
          mainComment: data.mainComment,
          updatedAt: Timestamp.fromDate(new Date())
        } as Auth;

        Alert.alert("Storageに画像を追加しました。");

        try {
          if (user?.displayName) {
            //ここの断りが必要
            const creatorRef = doc(db, ALL_USERS, user.displayName);

            await setDoc(
              //もともと無かったupdatedAtを追加したのでupdateにはsetDocを使う
              creatorRef,
              authInfo,
              { merge: true }
            );
          }
          // return { userPhoto, mainComment, userName, updatedAt };
        } catch (e) {
          Alert.alert("Firestoreに保存を失敗しました");
          console.log("Firestoreに保存を失敗しました", e); //<-- これでエラー内容確認
        }

        //----------------------------------------------------------------------
        // Alert.alert("プロファイルを更新しました");
      } catch (error) {
        Alert.alert("プロファイルを更新に失敗しました。");
      } finally {
        setAddRequestStatus("idle");
        // onSaveClick(false);
      }
    }
  };

  //   if (!currentUser) return null;
  return (
    <ScrollView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss;
        }}
      >
        <Center mt={25}>
          {/* プロフィール画像 ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/}
          <TouchableOpacity onPress={handlePickImage}>
            <Center>
              <Circle size="100">
                <ImageBackground
                  source={{
                    uri: uploadImage
                      ? uploadImage
                      : userData?.userPhoto || TEST_IMAGE
                  }}
                  style={EditProfileStyle.photo}
                  imageStyle={{ borderRadius: 15 }}
                >
                  <Center flex={1}>
                    <Icon
                      as={MaterialCommunityIcons}
                      name="camera-plus-outline"
                      color="white"
                      style={EditProfileStyle.photoIcon}
                    />
                  </Center>
                </ImageBackground>
              </Circle>
            </Center>
          </TouchableOpacity>

          {/* クリエイター名 ーー名前は変更不可にするーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/}
          <Spacer />
          <Text>{user?.displayName}</Text>
          <Spacer />
          {/* メインメッセージ ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/}
          <Controller
            defaultValue=""
            control={control}
            name="mainComment"
            rules={{
              required: true
            }}
            render={({ field: { onChange, value, onBlur } }) => (
              <StyledTextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                // placeholder="プロフィール画面に書く一言お願いします"
                placeholder={
                  userData?.mainComment
                    ? userData.mainComment
                    : "プロフィール画面に書く一言お願いします"
                }
                autoCapitalize="none"
                autoCorrect={false}
                multiline
                defaultValue={value} //足してみた
              />
            )}
          />
          {errors.mainComment && (
            <Text style={basicStyles.warningText}>
              コメントの入力お願いします！
            </Text>
          )}

          {/* 完了ボタンーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー */}
          <Spacer />
          <View width={"100%"}>
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

export default EditProfilePage;
