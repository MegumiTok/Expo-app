import { StyleSheet, TouchableOpacity, Image, View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useCallback } from "react";
import { Button } from "native-base";
//+styles---------------------------------------------------------
import { SocialButton } from "@components/styles/button";
import { basicStyles } from "@components/styles/theme/basicStyleSheet";

import InputField from "@components/styles/InputField";

//+functions----------------------------------------------------
import { _inputStrictCheck } from "@functions/_inputStrictCheck";

//type---------------------------------------------------------
import type { Login } from "@models/AuthTypes";
import type { LogInProps } from "@models/NavTypes";
import type { FC } from "react";
import { AuthRoutes } from "@modules/models";

export const LoginPage: FC<LogInProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Login>();

  const { loginWithEmailAndPassword, loginWithGoogle } = useAuthentication();

  const onSubmit = useCallback(
    handleSubmit((data: Login) => {
      _inputStrictCheck(data);
      loginWithEmailAndPassword(data);
    }),
    []
  );

  const passwordResetHandler = useCallback(
    () => navigation.navigate(AuthRoutes.ForgotPassword),
    []
  );

  return (
    <View style={styles.container}>
      <Image source={require("@assets/images/logo.png")} style={styles.logo} />
      {/* メールアドレス ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/}
      <Controller
        defaultValue=""
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputField
            onBlur={onBlur} //TSの問題
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
          メールアドレスの入力をしてください
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
            onBlur={onBlur} //TSの問題
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
          パスワードの入力をしてください
        </Text>
      )}

      {/* ボタンーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー */}
      <Spacer />
      <Button
        onPress={() => {
          reset({
            email: "",
            password: ""
          });
        }}
        p={3}
        colorScheme="success"
        variant="outline"
      >
        入力リセット
      </Button>
      <Spacer />

      <Button
        onPress={handleSubmit(onSubmit)}
        colorScheme="success"
        p={3}
        width="100%"
      >
        ログイン
      </Button>
      {/* パスワードを忘れた方 ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/}
      <TouchableOpacity
        style={styles.forgotButton}
        onPress={passwordResetHandler}
      >
        <Text style={styles.navButtonText}>パスワードを忘れた方</Text>
      </TouchableOpacity>
      <>
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
          onPress={() => loginWithGoogle()}
        />
      </>
      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate(AuthRoutes.Signup)}
      >
        <Text style={styles.navButtonText}>まだアカウントを持ってない方</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: { width: 150, height: 100, resizeMode: "contain" },

  forgotButton: {
    marginVertical: 25
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "NotoSansJP-Regular"
  }
});
