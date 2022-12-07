import { Alert } from "react-native";

//アドレスの日本語入力チェック
const jpCheck = (Email: string) => {
  const regexEmail = /[亜-熙ぁ-んァ-ヶ]/;
  return regexEmail.test(Email);
};

//アドレス,パスワードの空文字チェック
const blankCheck = (props: any) => {
  const regexEmail = /[^\s　]/;
  return !regexEmail.test(props);
};

//アドレスの形式チェック('英数字' + @ + '英数字' + . + '英数字'の形式のみ可)
const checkEmailFormat = (Email: string) => {
  const regexEmail =
    /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  return !regexEmail.test(Email);
};

interface Props {
  email: string;
  password: string;
}
export function _inputStrictCheck({ email, password }: Props) {
  //Emailに日本語が含まれないかのCheck
  const isJapanese = jpCheck(email);
  //Emailが空文字ではないかのCheck
  const isBlankEmail = blankCheck(email);
  //Emailのフォーマットが正しいかのCheck
  const isFormatAddress = checkEmailFormat(email);
  //Passwordが空文字ではないかのCheck
  const isBlankPassword = blankCheck(password);
  if (isJapanese || isBlankEmail || isBlankPassword || isFormatAddress) {
    Alert.alert("入力に誤りがあります。正しく入力してください");
  }
}
