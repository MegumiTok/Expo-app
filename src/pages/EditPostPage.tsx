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
  TextInput,
  StyleSheet
} from "react-native";
import { Text, Center, View, ScrollView, StatusBar } from "native-base";

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

import { OutlineButton } from "@components/styles/button";
//types-----------------------------------------------------------
import type { Post } from "@models/PostTypes";
import type { FC } from "react";
import { Colors } from "@components/styles/theme/Colors";

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
    <View style={{ backgroundColor: "#fff" }}>
      <StatusBar hidden />
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
              <Center p={2}>
                <View style={styles.box}>
                  <Text style={styles.text}>
                    ◆ コメントとジャンルを変更できます。
                  </Text>
                  <Text style={styles.text}>
                    ◆ 画像を変更したい場合は投稿をしなおしてください。
                  </Text>
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
                      <TextInput
                        style={styles.textInput}
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
                  <OutlineButton
                    onPress={() => {
                      reset({
                        comment: item.comment,
                        genre: item.genre
                      });
                    }}
                    title="現在の投稿を表示"
                    color="green"
                    width={SCREEN_WIDTH * 0.8 * 0.49}
                  />
                  {/* リセットボタン ------------------------*/}
                  <OutlineButton
                    onPress={() => {
                      reset({
                        comment: "",
                        genre: undefined
                      });
                    }}
                    title="入力リセット"
                    color="green"
                    width={SCREEN_WIDTH * 0.7 * 0.49}
                  />
                </View>

                {/* Saveボタン＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ */}
                <View width={"100%"}>
                  <OutlineButton
                    onPress={handleSubmit(_onPress)}
                    title="編集完了"
                    disabled={!canSave}
                    name="check"
                    width={SCREEN_WIDTH * 0.8}
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
    </View>
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
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    alignItems: "center",
    marginVertical: 10
    // backgroundColor: "tomato"
  },
  box: {
    padding: 10,
    marginHorizontal: 0,
    marginBottom: 10,
    marginTop: 50,
    backgroundColor: Colors.primary.extraLight,
    borderRadius: 10,
    borderColor: Colors.primary.general,
    borderWidth: 1
  },
  text: {
    color: "#2f2a37"
  },
  textInput: {
    width: SCREEN_WIDTH * 0.9,
    height: 100,
    backgroundColor: "#fff",
    marginTop: 30
  }
});

export default EditPostPage;
