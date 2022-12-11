//画像の変更は不可
//画像を変更するばあいはpost自体を削除すればいい
//なのでここではコメントとジャンルのみ変更できるようにする
import React, { useState, useEffect } from "react";

import {
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
  Image,
  StyleSheet
} from "react-native";
import { Text, Button, Center, View, ScrollView } from "native-base";

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
import { StyledTextInput } from "@components/styles/pageStyle/AddPostStyle";
//types-----------------------------------------------------------
import type { Post } from "@models/PostTypes";
import type { FC } from "react";

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
  const [loading, setLoading] = useState(true); //<-- いらなかったが残しとく

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
        <>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <ScrollView>
              <Center p={10}>
                <View paddingY={3}>
                  <Text>コメントとジャンルを変更できます</Text>
                  <Text>画像を変更したい場合は投稿をしなおしてください</Text>
                </View>
                <View style={styles.img}>
                  <Image
                    style={{ width: SCREEN_WIDTH, height: takasa }}
                    source={{ uri: item.postedImage }}
                    resizeMode="contain"
                  />
                </View>
                <View style={{}}>
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
                        placeholder={
                          item?.comment
                            ? item.comment
                            : "ひとこと書いてください"
                        }
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
                <View>
                  <Controller
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field: { onChange, value } }) => (
                      <DropDownPicker
                        style={styles.dropdown}
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
                </View>
              </Center>
            </ScrollView>
          </TouchableWithoutFeedback>
          {/* Saveボタン＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */}
          <Button
            onPress={handleSubmit(onPressSaveButton)}
            disabled={!canSave}
            style={styles.button}
            colorScheme="secondary"
          >
            完了
          </Button>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    // borderColor: "pink",
    // borderWidth: 3
  },
  button: {
    position: "absolute",
    bottom: 15,
    alignSelf: "center"
  },
  dropdown: { marginVertical: 20, width: "100%" }
});

export default EditPostPage;
