//画像の変更は不可
//画像を変更するばあいはpost自体を削除すればいい
//なのでここではコメントとジャンルのみ変更できるようにする
import React, { useState, useEffect } from "react";
import { Routes } from "@models/NavTypes";
import {
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Image,
  StyleSheet
} from "react-native";
import { Text, Center, View, ScrollView, Button } from "native-base";

import { useForm, Controller } from "react-hook-form";
import { LoadingView } from "@components/styles/LoadingView";
import { GENRES } from "src/config/const";
import DropDownPicker from "@components/DropDownPicker";
//function----------------
import { _takasaPost } from "@functions/_takasaPost";

//redux --------------------------------
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "@Redux/hook";
import { updatePost } from "@Redux/postActions";
//style-------------------------------------------------------------------
import { basicStyles } from "@components/styles/theme/basicStyleSheet";
import { SCREEN_WIDTH, PHOTO_HEIGHT } from "@components/styles/theme/layout";
import { StyledTextInput } from "@components/styles/pageStyle/AddPostStyle";
import { OutlineButton } from "@components/styles/button";
//types-----------------------------------------------------------
import type { Post } from "@models/PostTypes";
import type { FC } from "react";

interface FormInput {
  comment: string;
  genre: {
    id: number;
    name: "string";
  };
}

export const EditPostPage: FC<any> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const [loading, setLoading] = useState(true); //<-- いらなかったが残しとく

  const [takasa, setTakasa] = useState<number>();
  const { item } = route.params;

  useEffect(() => {
    const getPost = async () => {
      try {
        if (!item) {
          return null;
        }
        console.log("postId:", item.postId);

        const _takasa = _takasaPost({
          imageH: item.imageH,
          imageW: item.imageW
        });

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

  const _onPress = async (data: FormInput) => {
    console.log("編集後データ", data);

    if (canSave) {
      if (!item) {
        return null;
      }
      try {
        setAddRequestStatus("pending");

        const resultAction = await dispatch(
          updatePost({
            comment: data.comment,
            genre: data.genre.name || data.genre,
            postId: item.postId
          } as Post)
        );
        unwrapResult(resultAction);
        navigation.navigate(Routes.Feed);

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
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, value } }) => (
                    <DropDownPicker
                      data={GENRES}
                      value={value}
                      onSelect={(value) => {
                        onChange(value);
                      }}
                    />
                  )}
                  name="genre"
                />
                <View style={styles.btn}>
                  {/* 現在の投稿を表示 ------------------------*/}
                  <Button
                    margin={1}
                    onPress={() => {
                      reset({
                        comment: item.comment,
                        genre: item.genre
                      });
                    }}
                    colorScheme="success"
                    variant="outline"
                  >
                    現在の投稿を表示?
                  </Button>

                  {/* リセットボタン ------------------------*/}
                  <Button
                    margin={1}
                    onPress={() => {
                      reset({
                        comment: "",
                        genre: undefined
                      });
                    }}
                    colorScheme="success"
                    variant="outline"
                  >
                    入力リセット
                  </Button>
                </View>

                {/* Saveボタン＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */}
                <View width={"100%"}>
                  <OutlineButton
                    onPress={handleSubmit(_onPress)}
                    title="編集完了"
                    disabled={!canSave}
                    name="check"
                  />
                </View>
              </Center>
            </ScrollView>
          </TouchableWithoutFeedback>
          {/* Saveボタン＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */}
          {/* <View width={"100%"} style={styles.button}>
            <OutlineButton
              onPress={handleSubmit(onPressSaveButton)}
              title="編集完了"
              disabled={!canSave}
            />
          </View> */}
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
  dropdown: { marginVertical: 20, width: "100%" },
  btn: {
    flexDirection: "row",

    alignItems: "center",
    margin: 10
  }
});

export default EditPostPage;
