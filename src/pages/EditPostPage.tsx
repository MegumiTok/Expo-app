//画像の変更は不可
//画像を変更するばあいはpost自体を削除すればいい
//なのでここではコメントとジャンルのみ変更できるようにする
import React, { useState, useEffect } from "react";

import {
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
  Image
} from "react-native";
import { Text, Button, Center } from "native-base";

import { useForm, Controller } from "react-hook-form";
import { LoadingView } from "@components/styles/LoadingView";
//3rd party------------------------------------------------------
import DropDownPicker from "react-native-dropdown-picker";

// firebase----------------------------
import { db, postsColRef } from "src/config/firebase";
import {
  onSnapshot,
  setDoc,
  doc,
  Timestamp,
  query,
  where
} from "firebase/firestore";
import { GENRES, CREATORS_POSTS } from "src/config/const";

//style-------------------------------------------------------------------
import { basicStyles } from "@components/styles/theme/basicStyleSheet";
import { SCREEN_WIDTH, PHOTO_HEIGHT } from "@components/styles/theme/layout";
//types-----------------------------------------------------------

import type { Post } from "@models/PostTypes";

import type { FC } from "react";
import type {
  DropDownPickerProps,
  ValueType,
  ItemType
} from "react-native-dropdown-picker";
import Routes from "@navigation/Routes";

interface FormInput {
  comment: string;
  genre: string;
}

export const EditPostPage: FC<any> = ({ route }) => {
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [open, setOpen] = useState<boolean>(false);
  //   const [items, setItems] = useState(GENRES) as ItemType<ValueType>;
  const [items, setItems] = useState(GENRES);
  //   const [value, setValue] = useState(null);
  //   const sizeItems = useMemo(() => getSizeItems(variants), [variants]);
  const [postData, setPostData] = useState<Post>();
  const [loading, setLoading] = useState(false); //<----- true!!!

  const [takasa, setTakasa] = useState<number>();
  const { item } = route.params;

  //   useEffectを通さないとTypeError: undefined is not an object (evaluating 'item.imageH')となる
  //   const calculatedMaxH = Math.round((SCREEN_WIDTH * item.imageH) / item.imageW); //実際ポストされるのサイズに計算
  //   const _takasa: number =
  //     calculatedMaxH < PHOTO_HEIGHT ? calculatedMaxH : PHOTO_HEIGHT;

  //useEffectはいらないかと思ったがundefinedを防ぐため今回仕様
  useEffect(() => {
    const getPost = async () => {
      try {
        if (!item) {
          return null;
        }
        console.log("postIdはこれ:", item.postId);
        const calculatedMaxH = Math.round(
          (SCREEN_WIDTH * item.imageH) / item.imageW
        ); //実際ポストされるのサイズに計算

        const _takasa: number =
          calculatedMaxH < PHOTO_HEIGHT ? calculatedMaxH : PHOTO_HEIGHT;

        setTakasa(_takasa);
        // setPostData(item);
        console.log(_takasa);
        if (loading) {
          setLoading(false);
        }
        // Alert.alert("Post情報取得に成功しました");
      } catch (e) {
        Alert.alert("Post情報取得に失敗しました。");
        console.log("Post情報取得エラー:", e);
      }
    };
    getPost();
  }, [item, loading]);

  //   useEffect(() => {
  //     const getPost = async () => {
  //       try {
  //         if (!item) {
  //           return null;
  //         }
  //         console.log("postIdはこれ:", item.postId);
  //         const q = query(postsColRef, where("postId", "==", item.postId)); //ドキュメントIDを参照して取ってくる方がスマートだとは思う

  //         onSnapshot(q, (snapshot) => {
  //           const post = [] as Post[];
  //           snapshot.docs.forEach((doc) => {
  //             // post.push({ ...doc.data() });
  //             const {
  //               creatorId,
  //               creatorName,
  //               creatorPhoto,
  //               date,
  //               genre,
  //               comment,
  //               postedImage,
  //               reactions,
  //               imageW,
  //               imageH,
  //               product
  //             } = doc.data();
  //             post.push({
  //               postId: doc.id, //post更新時にpostIdをdocIdに合わせる仕様
  //               creatorId,
  //               creatorName,
  //               creatorPhoto,
  //               date,
  //               genre,
  //               comment,
  //               postedImage,
  //               reactions,
  //               imageW,
  //               imageH,
  //               product
  //             });
  //           });
  //           setPostData(post[0]);
  //         });

  //         const calculatedMaxH = Math.round(
  //           (SCREEN_WIDTH * item.imageH) / item.imageW
  //         ); //実際ポストされるのサイズに計算

  //         const _takasa: number =
  //           calculatedMaxH < PHOTO_HEIGHT ? calculatedMaxH : PHOTO_HEIGHT;

  //         setTakasa(_takasa);

  //         Alert.alert("Post情報取得に成功しました");
  //       } catch (e) {
  //         Alert.alert("Post情報取得に失敗しました。");
  //         console.log("Post情報取得エラー:", e);
  //       }
  //     };
  //     getPost();
  //   }, [item]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormInput>();

  // if (comment && genre) {
  //   dispatch(updatePost({ postId, comment, genre }));
  //   navigation.navigate(Routes.SinglePost, { postId });
  // }

  const onPressSaveButton = async (data: FormInput) => {
    console.log(data, "編集後データ");
    if (canSave) {
      if (!postData) {
        return null;
      }
      try {
        setAddRequestStatus("pending");

        const postInfo = {
          comment: data.comment,
          updatedAt: Timestamp.fromDate(new Date())
        } as Post;

        // const resultAction = dispatch(
        //   updatePost({
        //     // creatorName: post.creatorName,
        //     // creatorPhoto: post.creatorPhoto,
        //     // postedImage: post.postedImage,
        //     // date: post.date,
        //     // reactions: post.reactions,
        //     // isLiked: post.isLiked,
        //     // imageW: post.imageW,
        //     // imageH: post.imageH,
        //     ...post,
        //     postId,
        //     comment: data.comment,
        //     genre: data.genre
        //   })
        // );
        // unwrapResult(resultAction);
        const creatorRef = doc(db, CREATORS_POSTS, postData.postId);

        await setDoc(
          //もともと無かったupdatedAtを追加したのでupdateにはsetDocを使う
          creatorRef,
          postInfo,
          { merge: true }
        );
        // navigation.navigate(Routes.SinglePost, { postId });

        //----------------------------------------------------------------------
        Alert.alert("Postの更新がされました");
      } catch (error) {
        Alert.alert("Postの更新に失敗しました");
        console.log("Postの更新に失敗しました", error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const canSave = addRequestStatus === "idle";

  return (
    <>
      {loading ? (
        <LoadingView />
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <Center p={10} flex={1}>
            <Image
              style={{ width: SCREEN_WIDTH, height: takasa }}
              source={{ uri: item.postedImage }}
              resizeMode="contain"
            />
            <Controller
              defaultValue=""
              control={control}
              name="comment"
              rules={{
                required: true
              }}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="ひとこと書いてください"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              )}
            />
            {errors.comment && (
              <Text style={basicStyles.warningText}>
                コメントの入力が必要です
              </Text>
            )}
            {/* ジャンル＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */}

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
                  //   setValue={(value) => {
                  //     onChange(value);
                  //   }}
                  //   onChangeValue={(value) => {
                  //     onChange(value);
                  //   }}
                  setValue={onChange}
                  onChangeValue={onChange}
                  setOpen={setOpen}
                  setItems={setItems}
                />
              )}
              name="genre"
            />
            {/* Saveボタン＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */}
            <Button
              onPress={handleSubmit(onPressSaveButton)}
              disabled={!canSave}
            >
              <Text>編集終了</Text>
            </Button>
          </Center>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

export default EditPostPage;
