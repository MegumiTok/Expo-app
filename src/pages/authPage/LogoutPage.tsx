import { OutlineButton } from "@components/styles/button";
import { Center, Text } from "native-base";
import { useContext } from "react";
import { AuthContext } from "@navigation/AuthProvider";
//firebase-------------------------------
import { signOut } from "firebase/auth";
import { auth } from "src/config/firebase";

export const LogoutPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <Center flex={1}>
      <Text> {user?.uid}</Text>
      <Text> {user?.displayName}さん</Text>

      <OutlineButton onPress={() => signOut(auth)} title="ログアウト" />
    </Center>
  );
};

export default LogoutPage;
