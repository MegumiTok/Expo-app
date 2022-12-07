import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MenuProvider } from "react-native-popup-menu";
import Test from "@components/Test";
import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";

//+firebase---------------------------------
import { auth } from "src/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

export const Navigation = () => {
  const [activeUser, setActiveUser] = useState<User | null>();
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // setActiveUser({
        //   displayName: user.displayName,
        //   uid: user.uid
        // });
        setActiveUser(user);
        console.log("User is signed in", user.uid);
      } else {
        setActiveUser(null);
        console.log("User is signed out");
      }

      if (initializing) setInitializing(false);
    });
  }, []);

  if (initializing) return null;

  // console.log(initializing);
  return (
    <SafeAreaProvider>
      <MenuProvider>
        {activeUser ? <AppNavigator /> : <AuthNavigator />}
      </MenuProvider>
    </SafeAreaProvider>
  );
};

export default Navigation;
