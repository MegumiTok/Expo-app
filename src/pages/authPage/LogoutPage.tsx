import { OutlineButton } from "@components/styles/button";
import { Center, Text } from "native-base";
import { useContext } from "react";
import { AuthContext } from "@navigation/AuthProvider";

import { StyleSheet } from "react-native";
//firebase-------------------------------
import { signOut } from "firebase/auth";
import { auth } from "src/config/firebase";

export const LogoutPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <Center flex={1}>
      {/* <Center style={styles.box}>
        <Text marginRight={5}> user Id:</Text>
        <Text> {user?.uid}</Text>
      </Center> */}

      <Center style={styles.box}>
        <Text marginRight={5}> user name:</Text>
        <Text fontSize="2xl">{user?.displayName}</Text>
      </Center>
      <OutlineButton onPress={() => signOut(auth)} title="ログアウト" />
    </Center>
  );
};

export default LogoutPage;

const styles = StyleSheet.create({
  box: { flexDirection: "row", margin: 5 }
});
