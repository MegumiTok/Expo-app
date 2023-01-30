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
  ScrollView,
  StyleSheet
} from "react-native";
import { Routes } from "@models/NavTypes";
//const---------------------------------
import { TEST_IMAGE, ALL_USERS, CREATORS_POSTS } from "src/config/const";
//+functions----------------------------
import { _inputStrictCheck } from "@functions/_inputStrictCheck";
import * as PickImage from "@functions/_pickImage";
//+styles-----------------------------
import { basicStyles } from "@components/styles/theme/basicStyleSheet";
import Spacer from "@components/styles/Spacer";
import { OutlineButton } from "@components/styles/button";

import { StyledTextInput } from "@components/styles/pageStyle/AddPostStyle";
import { Colors } from "@components/styles/theme/Colors";
import { SCREEN_WIDTH, PHOTO_HEIGHT } from "@components/styles/theme/layout";
//context-----------------
import useUser from "@hooks/useUser";

// firebase----------------------------
import { auth, db, postsColRef } from "src/config/firebase";

import {
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";

//redux------------------------
import { useAppDispatch } from "@Redux/hook";
import { updateCreatorInfo } from "@Redux/creatorsActions";

//type--------------------------------
import type { Creator } from "@models/AuthTypes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { User } from "firebase/auth";
import { marginTop } from "styled-system";

// import { parseISO, formatDistanceToNow } from "date-fns";

interface FormInput {
  mainComment: string;
}

export const EditProfilePage = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const [userData, setUserData] = useState<Creator>();
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
          const result = docSnap.data() as Creator;
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

  //   const [imageData, setImageData] = useState<ImagePicker.ImageInfo>(
  //     {} as ImagePicker.ImageInfo
  //   );
  const [imageData, setImageData] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [galleryPermission, setGalleryPermission] = useState(null);
  //   const [postId, setPostId] = useState("");

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
      // console.log("ログ出し中", result.assets[0].uri);
      if (!result.canceled) {
        const img = result.assets[0].uri;

        setImageData(img);
      }
    } catch (error) {
      Alert.alert("エラーで投稿できませんでした");
    }
  };

  const canSave = Boolean(imageData) && addRequestStatus === "idle";

  //   //アップロードされるImageのuri
  //   const uploadImage = imageData.uri;

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
          imageData, //uri
          // `userAvatar/${user.displayName}`, //path アバター写真は一個しかないので一段階削除
          "userAvatar", //path
          user?.displayName //fName
        );
        console.log("ファイル名", filename);

        Alert.alert("Storageに画像を追加しました。");

        const authInfo = {
          creatorId: user?.uid,
          creatorName: user?.displayName,
          creatorPhoto: imageData,
          mainComment: data.mainComment
          // updatedAt: Timestamp.fromDate(new Date())
        } as Creator;

        try {
          if (user?.displayName) {
            // const creatorRef = doc(db, ALL_USERS, user.displayName);
            // await setDoc(
            //   //もともと無かったupdatedAtを追加したのでupdateにはsetDocを使う
            //   creatorRef,
            //   authInfo,
            //   { merge: true }
            // );

            // ToolkitのunwrapResult functionを使うよりこっちの方がスマートかも
            await dispatch(updateCreatorInfo(authInfo)).unwrap();

            //🔵creators_postコレクションのphotoもここで更新する
            const q = query(
              postsColRef,
              where("creatorName", "==", user.displayName)
            );
            //After creating a query object, use the get() function to retrieve the results:
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((document) => {
              console.log("potIdは:", document.id);
              const ref = doc(db, CREATORS_POSTS, document.id);
              updateDoc(ref, {
                creatorPhoto: imageData
              });
              console.log(document.id, " => ", document.data());
            });
            // 🟡documentのIdが知りたくてこの書き方をしたがもっとスマートに書けないだろうか

            const currentUser = auth.currentUser;

            // そしてプロファイルの`photoURL`も更新する(冗長かもしれないがaddPostの時プロファイル情報を使っているので必要)
            if (currentUser !== null) {
              await updateProfile(currentUser, {
                // update a user's basic profile information
                photoURL: imageData
              } as User);
            }
          }
          navigation.navigate(Routes.Feed);
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
      <Center style={styles.box}>
        <Text style={styles.text}>
          ◆ プロフィールの画像とコメントを変更できます
        </Text>
      </Center>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss;
        }}
      >
        <Center mt={25}>
          {/* プロフィール画像 ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/}
          <TouchableOpacity onPress={handlePickImage}>
            <Center>
              <Circle size="250">
                <ImageBackground
                  source={{
                    uri: imageData
                      ? imageData
                      : userData?.userPhoto || TEST_IMAGE
                  }}
                  style={styles.photo}
                  imageStyle={{ borderRadius: 15 }}
                >
                  <Center flex={1}>
                    <Icon
                      as={MaterialCommunityIcons}
                      name="camera-plus-outline"
                      color="white"
                      style={styles.photoIcon}
                      size="10"
                    />
                  </Center>
                </ImageBackground>
              </Circle>
            </Center>
          </TouchableOpacity>

          {/* クリエイター名 ーー名前は変更不可にするーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/}
          <Spacer />
          <Text style={styles.name}>{user?.displayName}</Text>
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
          <View width={"100%"} mt={10}>
            <OutlineButton
              onPress={handleSubmit(onPressSaveButton)}
              title="編集完了"
              disabled={!canSave}
              name="check"
              width={SCREEN_WIDTH * 0.8}
            />
          </View>
        </Center>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default EditProfilePage;

const styles = StyleSheet.create({
  box: {
    padding: 10,
    margin: 10,

    backgroundColor: Colors.primary.extraLight,
    borderRadius: 10,
    borderColor: Colors.primary.general,
    borderWidth: 1
  },
  photo: {
    height: 250,
    width: 250
  },
  photoIcon: {
    opacity: 0.9,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "#fff",
    borderRadius: 10
  },
  text: {
    color: "#2f2a37"
  },
  name: {
    color: "#2f2a37",
    fontSize: 20
  }
});
