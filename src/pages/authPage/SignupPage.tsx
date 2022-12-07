import { TouchableOpacity, StyleSheet, Alert } from "react-native";

import { useState } from "react";

import { useForm, Controller } from "react-hook-form";
// import { ActivityIndicator } from "react-native";
import { Button, ScrollView, View, Text } from "native-base";
// import { PublicAuthGuard } from "@navigation/PublicAuthGuard";
//+functions----------------------------
import { _inputStrictCheck } from "@functions/_inputStrictCheck";

//+styles-----------------------------
import { basicStyles } from "@components/styles/theme/basicStyleSheet";
import InputField from "@components/styles/InputField";
import { SPACING } from "@components/styles/theme/layout";

//type--------------------------------
import type { SignUpProps } from "@models/NavTypes";
import { AuthRoutes } from "@models/NavTypes";
import { Register } from "@models/AuthTypes";
// import useUser from "@modules/context/hooks/useUser";

// firebase--------------------------

// import { API_KEY } from "@env";
import Constants from "expo-constants";
import { auth, db } from "src/config/firebase";
import { ALL_USERS } from "src/config/const";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  Timestamp
} from "firebase/firestore";

export const SignupPage = ({ navigation }: SignUpProps) => {
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors } //Use formState because we got undefined error object.
  } = useForm<Register>();

  const canSave = addRequestStatus === "idle";

  const onSubmit = async (data: Register) => {
    _inputStrictCheck(data);
    if (canSave) {
      try {
        setAddRequestStatus("pending");

        // setUserFlg("general"); //アプリからの会員登録は全員一般ユーザー！

        const resisterData: Register = {
          userName: data.userName,
          // userPhoto: filename,
          email: data.email,
          password: data.password,
          userFlg: "general"
          //userFlg: "general", //アプリからの会員登録は全員一般ユーザー！
        };

        const { email, password, userName, userFlg } = resisterData;

        console.log("登録データ", resisterData);
        //console.log("apiKeyはkore", API_KEY);// console.logでもエラーだとここで認証失敗する

        const userRef = doc(db, ALL_USERS, userName); //名前は変更不可にする

        createUserWithEmailAndPassword(
          auth,
          resisterData.email,
          resisterData.password
        )
          .then((userCredential) => {
            setDoc(userRef, {
              userName,
              email,
              userId: userCredential.user.uid,
              userPhoto: "",
              userFlg: userFlg,
              createdAt: Timestamp.fromDate(new Date()),
              mainComment: ""
            });
          })
          .catch((e) => {
            console.log(e.code);
          });

        //----
        Alert.alert("ユーザー名", `${data.userName}`);
      } catch (e) {
        Alert.alert(
          "サインアップ完了できませんでした。",
          `ユーザー名：${data.userName}`
        );
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  //Googleーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
  // const handleGoogleLogin = () => dispatch(signInWithGoogle());
  const handleGoogleLogin = () => {
    true;
  };

  return (
    <ScrollView p={SPACING}>
      {/* <Text style={styles.text}>アカウントを作る</Text> */}
      {/* 名前 ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/}
      <Controller
        defaultValue=""
        control={control}
        name="userName"
        rules={{
          required: true
        }}
        render={({ field: { onChange, value, onBlur } }) => (
          <InputField
            onBlur={onBlur}
            // error={}
            // onChangeText={(value) => onChange(value)}
            onChangeText={onChange}
            value={value}
            placeholder="ユーザー名"
            autoCapitalize="none"
            autoCorrect={false}
            iconType="user"
            // keyboardType="email-address"
          />
        )}
      />
      {errors.userName && (
        <Text style={basicStyles.warningText}>名前の入力が必要です</Text>
      )}
      <Text pb={3} pl={3}>
        ※ユーザー名は登録後変更できません
      </Text>

      {/* メールアドレス ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/}
      <Controller
        defaultValue=""
        control={control}
        name="email"
        rules={{
          required: true
        }}
        render={({ field: { onChange, value, onBlur } }) => (
          <InputField
            onBlur={onBlur}
            // error={}
            // onChangeText={(value) => onChange(value)}
            onChangeText={onChange}
            value={value}
            placeholder="メールアドレス"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            iconType="mail"
          />
        )}
      />
      {errors.email && (
        <Text style={basicStyles.warningText}>
          メールアドレスの入力が必要です
        </Text>
      )}

      {/* パスワード ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/}
      <Controller
        defaultValue=""
        control={control}
        name="password"
        rules={{
          required: true
        }}
        render={({ field: { onChange, value, onBlur } }) => (
          <InputField
            onBlur={onBlur}
            // onChangeText={(value: string) => onChange(value)}
            onChangeText={onChange}
            value={value}
            placeholder="パスワード"
            iconType="lock"
            secureTextEntry={true}
          />
        )}
      />
      {errors.password && (
        <Text style={basicStyles.warningText}>
          パスワードの入力が必要です（〇文字以上）
        </Text>
      )}

      {/* ボタン ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/}
      <Button
        onPress={() => {
          reset({
            email: "@",
            password: ""
          });
        }}
        variant="outline"
        p={3}
        mt={SPACING}
        colorScheme="success"
      >
        入力リセット
      </Button>

      <Button
        onPress={handleSubmit(onSubmit)}
        colorScheme="success"
        mt={SPACING}
        p={3}
      >
        登録
      </Button>
      {/* プライバシーポリシー ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝*/}
      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our
        </Text>
        <TouchableOpacity onPress={() => Alert.alert("Terms Clicked!")}>
          <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
            Terms of serviece
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}>and</Text>
        <Text style={[styles.color_textPrivate, { color: "#e88832" }]}>
          Privacy Policy
        </Text>
      </View>

      {/* その他のログインオプション ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝*/}
      {/* <View>
        <SocialButton
          buttonTitle="Facebookでサインイン"
          btnType="facebook"
          color="#4867aa"
          backgroundColor="#e6eaf4"
          onPress={() => true}
        />

        <SocialButton
          buttonTitle="Googleでサインイン"
          btnType="google"
          color="#de4d41"
          backgroundColor="#f5e7ea"
          // onPress={handleGoogleLogin}
          onPress={() => true}
        />
      </View> */}

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate(AuthRoutes.Login)}
      >
        <Text style={styles.navButtonText}>すでにアカウントを持っている方</Text>
      </TouchableOpacity>
    </ScrollView>
    // </>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "NotoSansJP-Regular",
    alignSelf: "center"
  },
  navButton: {
    marginTop: 15
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 35,
    justifyContent: "center"
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: "400",
    fontFamily: "NotoSansJP-Regular",
    color: "grey"
  }
});
