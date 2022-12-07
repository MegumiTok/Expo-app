import { OutlineButton } from "@components/styles/button";
import { Center, Text } from "native-base";

//firebase-------------------------------
import { signOut } from "firebase/auth";
import { auth } from "src/config/firebase";

export const LogoutPage = () => {
  //   const currentUser = useAppSelector(selectCurrentUser);
  // const { logout } = useContext(AuthContext);
  return (
    <Center flex={1}>
      {/* <Text>{currentUser.userName}さん</Text> */}
      <OutlineButton onPress={() => signOut(auth)} title="ログアウト" />
    </Center>
  );
};

export default LogoutPage;
